async function get(path) {
  try {
    const response = await fetch(path);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export {
  get
};
