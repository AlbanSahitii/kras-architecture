"use client";
import React, {useEffect, useRef, useState} from "react";

const Mainpage = () => {
  /*
  const { isLoading, error, data } = useQuery({
    queryKey: ['myData'], // Unique key for your query
    queryFn: fetchData,
  });

*/

  const [items, setItems] = useState(Array.from({length: 5}, (_, i) => i + 1));
  const divRef = useRef(items.map(() => React.createRef()));
  console.log(divRef);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(entry);
          }
        });
      },
      {threshold: 0.5}
    );

    divRef.current.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      divRef.current.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [items]);

  return (
    <>
      {items?.map((item, index) => (
        <div
          key={item}
          ref={divRef.current[index]}
          className={`h-lvh bg-yellow-${item * 100}`}
        >
          {item}
        </div>
      ))}
    </>
  );
};

export default Mainpage;
