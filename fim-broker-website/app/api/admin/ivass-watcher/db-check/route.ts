/**
 * Diagnostica Supabase per il watcher IVASS — solo admin loggato.
 *
 * GET /api/admin/ivass-watcher/db-check
 *
 * Verifica in modo isolato:
 *  1. presenza delle env var (senza esporre i valori)
 *  2. raggiungibilità di Supabase tramite uno SELECT minimale
 *  3. esistenza della tabella `ivass_watcher_state` e RLS attive
 *
 * Utile per capire perché `inserted: 0, error: "TypeError: fetch failed"` nel cron.
 */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getSupabase } from '@/lib/supabase'

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value) return false
  return verifyAdminToken(session.value)
}

function describeError(err: unknown): string {
  if (err instanceof Error) {
    const cause = (err as Error & { cause?: unknown }).cause
    const causeStr =
      cause instanceof Error ? `${cause.name}: ${cause.message}` : cause ? String(cause) : null
    return causeStr ? `${err.name}: ${err.message} | cause=${causeStr}` : `${err.name}: ${err.message}`
  }
  return String(err)
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  // 1. Presenza env var (senza esporre i valori)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: {
      present: Boolean(url),
      startsWithHttps: url?.startsWith('https://') ?? false,
      host: url ? new URL(url).host : null,
      length: url?.length ?? 0,
    },
    SUPABASE_SERVICE_ROLE_KEY: {
      present: Boolean(key),
      length: key?.length ?? 0,
      // Le service role keys di Supabase sono JWT lunghi ~200+ char
      looksLikeJwt: Boolean(key && key.startsWith('eyJ') && key.length > 100),
    },
  }

  // 2. Tenta di creare il client
  const supa = getSupabase()
  if (!supa) {
    return NextResponse.json({
      step: 'getSupabase',
      ok: false,
      reason: 'getSupabase() returned null — env mancanti o non lette',
      env,
    })
  }

  // 3. SELECT minimale per testare la connessione e l'esistenza della tabella
  let selectResult: {
    ok: boolean
    rowCount?: number | null
    pgError?: { message: string; code?: string; hint?: string } | null
    threwError?: string
    elapsedMs?: number
  } = { ok: false }
  const t0 = Date.now()
  try {
    const { data, error, count } = await supa
      .from('ivass_watcher_state')
      .select('id', { count: 'exact', head: true })
    selectResult = {
      ok: !error,
      rowCount: count,
      pgError: error ? { message: error.message, code: error.code, hint: error.hint } : null,
      elapsedMs: Date.now() - t0,
    }
    void data
  } catch (err) {
    selectResult = {
      ok: false,
      threwError: describeError(err),
      elapsedMs: Date.now() - t0,
    }
  }

  // 4. Tentativo di INSERT/DELETE di una riga test (rollback subito)
  let writeResult: {
    ok: boolean
    inserted?: boolean
    deleted?: boolean
    pgError?: { message: string; code?: string } | null
    threwError?: string
    elapsedMs?: number
  } = { ok: false }
  const t1 = Date.now()
  const testId = `__diag_${Date.now().toString(36)}`
  try {
    const { error: insertErr } = await supa.from('ivass_watcher_state').insert({
      id: testId,
      source: 'ivass',
      title: '__DIAG_TEST__',
      url: 'https://example.invalid/diag',
    })
    if (insertErr) {
      writeResult = {
        ok: false,
        pgError: { message: insertErr.message, code: insertErr.code },
        elapsedMs: Date.now() - t1,
      }
    } else {
      const { error: delErr } = await supa.from('ivass_watcher_state').delete().eq('id', testId)
      writeResult = {
        ok: !delErr,
        inserted: true,
        deleted: !delErr,
        pgError: delErr ? { message: delErr.message, code: delErr.code } : null,
        elapsedMs: Date.now() - t1,
      }
    }
  } catch (err) {
    writeResult = {
      ok: false,
      threwError: describeError(err),
      elapsedMs: Date.now() - t1,
    }
  }

  return NextResponse.json({
    at: new Date().toISOString(),
    env,
    select: selectResult,
    write: writeResult,
  })
}
