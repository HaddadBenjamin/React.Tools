import encodeToBase64 from '../../../utilities/type/string/encodeToBase64';

const generateCodeVerifier = () => {
  const array = new Uint32Array(56 / 2);

  window.crypto.getRandomValues(array);

  return Array.from(array, (dec) => (`0${dec.toString(16)}`).substr(-2)).join('');
};

const generateCodeVerifierAndCodeChallenge = async (): Promise<[string, string]> => {
  const code_verifier = generateCodeVerifier();
  const encoder = new TextEncoder();
  const data = encoder.encode(code_verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64Digest = encodeToBase64(digest);
  const code_challenge = base64Digest
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return [code_verifier, code_challenge];
};

export default generateCodeVerifierAndCodeChallenge;
