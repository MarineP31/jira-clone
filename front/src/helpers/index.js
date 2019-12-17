export function promptConfirmationMessage(text) {
  const confirmation = window.confirm(text);
  if (confirmation) {
    window.location.replace('/');
  }
}
