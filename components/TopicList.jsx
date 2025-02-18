import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics`, {
      cache: "no-cache",
    });
    console.log(res)
    if (!res.ok) {
      throw new Error("Fetching topics failed");
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching topics: ", error);
  }
};

export default async function TopicList() {
  const { topics } = await getTopics();
  console.log(topics);
  return (
    <>
      {topics.map((value) => (
        <div
          key={value._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{value.title}</h2>
            <div>{value.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={value._id}/>
            <Link href={`/editTopic/${value._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
