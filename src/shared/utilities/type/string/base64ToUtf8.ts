const base64ToUtf8 = (base64Text : string) : string => window.atob(base64Text);

export default base64ToUtf8;
