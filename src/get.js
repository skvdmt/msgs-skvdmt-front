const api_basepath = "https://msgs.skvdmt.ru/api/v1";

export default async function get(path, complete) {
  let total;
  fetch(api_basepath + path)
    .then((res) => {
      total = res.headers.get("x-total-count");
      return res.json();
    })
    .then((data) => {
      complete(total, data);
    });
}
