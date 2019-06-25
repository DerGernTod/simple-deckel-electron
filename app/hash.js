export function hash(val) {
    return crypto.subtle.digest('SHA-512', new TextEncoder().encode(val)).then(result => encode64(result));
}
function encode64 (buff) {
    return btoa(new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), ''));
}