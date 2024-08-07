"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { cleanUser } from "@/libs/cleanUser";
import UserCard from "@/components/UserCard";

export default function RandomUserPage() {
  // annotate type for users state variable
  const [users, setUsers] = useState([]); //users is list

  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;

    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/cleanUser
    //Then update state with function : setUsers(...)
    const CleanedUser = users.map((indextUser: any)=>(cleanUser(indextUser))) 
    setUsers(CleanedUser);

  };

  useEffect(()=>{
    if(isFirstLoad){
      setIsFirstLoad(false);
      return;
    }
    const jsonStr = JSON.stringify(genAmount);
    localStorage.setItem("amount", jsonStr);
  },[genAmount])
  
  useEffect(()=>{
    const convertStrToAmount = localStorage.getItem("amount");
    if(convertStrToAmount === null){
      setGenAmount(1);
      return;
    }
    const oldAmount = JSON.parse(convertStrToAmount);
    setGenAmount(oldAmount);
  },[])

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(Number(e.target.value))}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((Point : any)=>(
      <UserCard key = {Point.email} name = {Point.name} imgUrl={Point.imgUrl} address={Point.address} email={Point.email} />
      ))}
    </div>
  );
}