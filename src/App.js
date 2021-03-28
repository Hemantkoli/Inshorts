import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/NavInshort";
import NewsContent from "./components/NewsContent/NewsContent.js";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(10);
  const [category, setCategory] = useState("sports");

  //console.log(process.env);

  const newsApi = async () => {
    try {
      //const proxyUrl = "https://cors-anywhere.herokuapp.com/";

      const news = await axios.get(
        `https://gnews.io/api/v4/search?lang=en&country=in&q=${category}&page=${loadMore}&token=1c30fd867daa9bdad2f55ee80fe2c61c`
      );
      console.log(news.data.articles);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalArticles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, loadMore, category]);

  return (
    <div className="App" id="#home">
      <NavInshort setCategory={setCategory} />
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
