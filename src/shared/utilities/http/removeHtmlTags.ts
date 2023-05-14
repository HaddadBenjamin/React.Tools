export default (text: string): string => text.replace(/(<([^>]+)>)/gi, '');
