import React, { useEffect, useState } from "react";
import Header from "../components/header.component";
import Card from "../components/card.component";
import Textarea from "../components/textarea.component";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="container py-3">
      <Header />
      <Textarea setData={setData} />
      {Object.keys(data).length !== 0 && <Card data={data} />}
    </div>
  );
};

export default Home;
