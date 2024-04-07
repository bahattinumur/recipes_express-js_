import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Error from "../components/Error";
import { useDebounce } from "@uidotdev/usehooks";

const MainPage = () => {
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);

  // Kullanıcnın belirli bir süre içerisnde yaptığı değişiklikleri
  // Görmezden gelir ancak kullanıcı 300 ms beklerse yapılan değişikliği algılar
  const debouncedTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setIsLoading(true);

    // Gönderilcek parametreleri belirle
    const params = {
      title: debouncedTerm,
      order: order,
    };

    axios
      .get("http://127.0.0.1:4000/api/recipes", { params })
      .then((res) => {
        setData(res.data);
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setIsLoading(false));
  }, [debouncedTerm, order]);

  return (
    <main className="flex-1 bg-gray-200 p-4 h-screen overflow-auto">
      <section>
        <div className="bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
          <CiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
            type="text"
          />
        </div>
      </section>

      <section className="mt-5">
        {isLoading ? (
          <Loader />
        ) : errorMsg ? (
          <Error message={errorMsg} />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5">{data.results} Recipes Found</h1>

              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="rounded-md p-2"
              >
                <option hidden>By Duration</option>
                <option value={"asc"}>Ascending</option>
                <option value={"desc"}>Descending</option>
              </select>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {data.recipes.map((recipe) => (
                <Card key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default MainPage;
