/*** to connect api:
 * (apimethod: api method name),
 * (success: success callback),
 * (finally: finally callback),
 * (jsonparams: json params to send to api method -default null-),
 * (typemethod: Method to send to api POST, GET, etc - default GET -)
 */
const ConnectApi = async (
  apimethod: String,
  success_callb: any,
  finally_callb: any,
  jsonparams = null,
  typemethod = "GET"
) => {
  const conf = {
    method: typemethod,
    headers: { "Content-Type": "application/json" },
  };

  if (jsonparams != null) conf["body"] = JSON.stringify(jsonparams);

  await fetch(`${import.meta.env.VITE_API_URL + apimethod}`, conf)
    .then((res) => res.json())
    .then(success_callb)
    .catch((err) => console.log(`Error API: ${err}`))
    .finally(finally_callb);
};

export default ConnectApi;
