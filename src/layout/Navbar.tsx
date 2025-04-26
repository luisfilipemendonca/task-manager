import { useAppSelector } from "../app/hooks";
import CategoriesCreateButton from "../features/categories/CategoriesCreateButton";
import {
  categoriesSelector,
  getCategoriesStatus,
} from "../features/categories/categoriesSlice";

const Navbar = () => {
  const categories = useAppSelector(categoriesSelector);
  const categoriesStatus = useAppSelector(getCategoriesStatus);

  const renderLoading = () => <p className="text-center">Loading categories</p>;

  const renderEmptyState = () => (
    <p className="text-center">No categories created yet</p>
  );

  const renderCategories = () => {
    return (
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-400 text-primary-100 mb-8 py-2 text-center text-xl">
                {category.description}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderContent = () => {
    if (categoriesStatus === "loading") return renderLoading();
    if (!categories.length) return renderEmptyState();

    return renderCategories();
  };

  return (
    <div
      className="fixed w-60 py-8 px-4 bg-primary-200 border-r-2 border-r-primary-400 flex flex-col justify-between"
      style={{ height: "calc(100% - 60px)" }}
    >
      {renderContent()}
      {categoriesStatus !== "loading" && <CategoriesCreateButton />}
    </div>
  );
};

export default Navbar;
