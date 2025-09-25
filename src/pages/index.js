import UserLayout from "./components/layout/UserLayout";
import Category from "./components/ui/category/Category";
import HeaderComponent from "./components/ui/header/header";



export default function Home() {
  return (
    <UserLayout>
      <HeaderComponent />
      <Category />
    </UserLayout>
  );
}
