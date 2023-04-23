export async function getItems<QueryResponse>(
  query: string,
): Promise<QueryResponse> {
  try {
    const respond = await fetch(`http://localhost:8080/api/items?q=${query}`);
    return await respond.json();
  } catch (error) {
    throw new Error(error.statusText);
  }
}
