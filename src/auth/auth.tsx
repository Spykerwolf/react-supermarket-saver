export let NEW_WORLD_SECRET: string | null =
  localStorage.getItem("NEW_WORLD_SECRET");
export let PAK_N_SAVE_SECRET: string | null =
  localStorage.getItem("PAK_N_SAVE_SECRET");

export async function getTokenNewWorld() {
  const getNewWorldToken = await fetch(
    "https://www.newworld.co.nz//CommonApi/Account/GetCurrentUser"
  );
  const newWorldTokenJSON = await getNewWorldToken.json();
  localStorage.setItem(
    "NEW_WORLD_SECRET",
    `Bearer ${newWorldTokenJSON.access_token}`
  );
}

export async function getTokenPakNSave() {
  const getPaknSaveToken = await fetch(
    "https://www.paknsave.co.nz/CommonApi/Account/GetCurrentUser"
  );
  const paknsaveTokenJSON = await getPaknSaveToken.json();
  localStorage.setItem(
    "PAK_N_SAVE_SECRET",
    `Bearer ${paknsaveTokenJSON.access_token}`
  );
}
