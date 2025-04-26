import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import CategoriesCreateButton from "../features/categories/CategoriesCreateButton";
import {
  categoriesSelector,
  categoriesStatusSelector,
  getCategories,
} from "../features/categories/categoriesSlice";

const Navbar = () => {
  const categories = useAppSelector(categoriesSelector);
  const categoriesStatus = useAppSelector(categoriesStatusSelector);
  const dispatch = useAppDispatch();

  console.log(categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (categoriesStatus === "loading") return <p>Loading...</p>;

  return (
    <div
      className="fixed w-60 py-8 px-4 bg-primary-200 border-r-2 border-r-primary-400 flex flex-col justify-between"
      style={{ height: "calc(100% - 60px)" }}
    >
      <nav>
        <ul>
          <li>
            <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-400 text-primary-100 mb-8 py-2 text-center text-xl">
              Primeiro
            </button>
          </li>
          <li>
            <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-300 text-primary-100 mb-8 py-2 text-center text-xl">
              Segundo
            </button>
          </li>
          <li>
            <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-300 text-primary-100 py-2 text-center text-xl">
              Terceiro
            </button>
          </li>
        </ul>
      </nav>
      <CategoriesCreateButton />
    </div>
  );
};

export default Navbar;
