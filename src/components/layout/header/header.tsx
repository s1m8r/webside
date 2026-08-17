import { Link, useNavigate } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LogOutIcon,
  Menu,
  Search,
  ShoppingCart,
  UserIcon,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { useGetStores } from "@/API/stores";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import useDebounce from "./searchDelay";
import { useState } from "react";
import { useGetProducts } from "@/API/product";

const Header = () => {
  const { items, clearCart } = useCartStore();
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const debounceQuery = useDebounce(query, 400);
  const { data: products } = useGetProducts(10, "", 1, debounceQuery);
  const navigator = useNavigate();
  const goToLogin = () => {
    navigator({ to: "/login" });
  };
  const user = useAuthStore.getState().user;
  const logout = useAuthStore.getState().logout;
  const { data: Shop } = useGetStores();
  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md md:px-12">
      <div className="mx-auto hidden h-16 items-center gap-6 px-6 md:flex">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-bold">Samer Shop</span>
        </Link>
        <NavigationMenu className="shrink-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Shops</NavigationMenuTrigger>
              <NavigationMenuContent>
                {Shop?.data.map((item) => (
                  <NavigationMenuLink key={item.id} asChild>
                    <Link to={`/stores/${item.id}`}>{item.name}</Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/stores/TopSell">On Sale</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/stores/newarrivals">New Arrivals</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/orders">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="relative flex-1 px-6">
          <InputGroup className="w-full bg-gray-200/50">
            <InputGroupInput
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <InputGroupAddon>
              <Search />
            </InputGroupAddon>

            {query && (
              <InputGroupAddon align="inline-end">
                {products?.data.length ?? 0} results
              </InputGroupAddon>
            )}
          </InputGroup>

          {query && (
            <div className="absolute left-6 right-6 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              {products?.data.length ? (
                products.data.map((item) => (
                  <Link
                    key={item.id}
                    to={`/products/${item.id}`}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-red-500">
                        {item.discountPercentage}%
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            className="relative"
            onClick={() => navigator({ to: "/mycart" })}
          >
            <ShoppingCart
              className={items.length > 0 ? "text-orange-500" : ""}
            />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center text-xs font-bold">
              {items.length}
            </span>
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          {!user && <Button onClick={goToLogin}>Login</Button>}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm"
                  variant="default"
                >
                  {user.firstName.charAt(0).toUpperCase()}
                  {user.lastName.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigator({ to: "/profile" })}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    clearCart();
                    logout();
                    navigator({ to: "/" });
                  }}
                >
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col md:hidden">
        <div className="flex h-16 w-full items-center justify-between px-2">
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            {openMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold">Samer Shop</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpenSearch((prev) => !prev)}>
              <Search />
            </button>
            <button
              className="relative"
              onClick={() => navigator({ to: "/mycart" })}
            >
              <ShoppingCart
                className={items.length > 0 ? "text-orange-500" : ""}
              />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center text-xs font-bold">
                {items.length}
              </span>
            </button>

            {!user && (
              <Button onClick={goToLogin} className="h-8 px-3">
                Login
              </Button>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs"
                    variant="default"
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                    {user.lastName.charAt(0).toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => navigator({ to: "/profile" })}
                  >
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      clearCart();
                      logout();
                      navigator({ to: "/" });
                    }}
                  >
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {openMenu && (
          <div className="border-t border-gray-200 bg-white py-4">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100"
              >
                Home
              </Link>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="shops">
                  <AccordionTrigger className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100">
                    Shops
                  </AccordionTrigger>
                  {Shop?.data.map((item) => (
                    <AccordionContent className="w-full">
                      <Link
                        key={item.id}
                        to={`/stores/${item.id}`}
                        onClick={closeMenu}
                        className="py-1 rounded-lg px-4 font-medium"
                      >
                        {item.name}
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
              <Link
                to="/stores/TopSell"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100"
              >
                On Sale
              </Link>
              <Link
                to="/stores/newarrivals"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100"
              >
                New Arrivals
              </Link>
              <Link
                to="/orders"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-gray-100"
              >
                Brands
              </Link>
            </div>
          </div>
        )}

        {openSearch && (
          <div className="relative w-full px-2 pb-3">
            <InputGroup className="w-full bg-gray-200/50">
              <InputGroupInput
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              {query && (
                <InputGroupAddon align="inline-end">
                  {products?.data.length ?? 0} results
                </InputGroupAddon>
              )}
            </InputGroup>
            {query && (
              <div className="absolute left-2 right-2 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                {products?.data.length ? (
                  products.data.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.id}`}
                      onClick={() => {
                        setQuery("");
                        setOpenSearch(false);
                      }}
                      className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-red-500">
                          {item.discountPercentage}%
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
