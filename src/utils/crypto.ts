/**
 * Secure hashing utility for client demonstration storage.
 * Uses the native Web Crypto API SHA-256 with a clinic salt.
 * Ensures passwords are never stored in plaintext.
 */
export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = 'FRL_THIRUVANANTHAPURAM_SECURE_SALT_v1';
  const data = encoder.encode(plainText + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
