import { Link, useNavigate } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { LogOutIcon, Search, ShoppingCart, UserIcon } from "lucide-react";
import { useAuthStore } from "@/stores/userStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/API/cart";
import { useGetStores } from "@/API/stores";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const Header = () => {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    clearCart,
  } = useCartStore();
  const sIcon =
    "bg-white p-1 rounded-md transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer";
  const navigator = useNavigate();
  const goToLogin = () => {
    navigator({ to: "/login" });
  };
  const user = useAuthStore.getState().user;
  const logout = useAuthStore.getState().logout;
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useCart();
  const goCart = () => {
    const array = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));
    if (user)
      mutate(
        {
          data: array,
          email: user.email,
        },
        {
          onSuccess: () => {
            clearCart();
            setIsOpen(false);
          },
        },
      );
  };
  const { data: Shop } = useGetStores();
  return (
    <div className="px-12 fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-bold">Samer Shop</span>
        </Link>
        <NavigationMenu className="shrink-0 ">
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
                <Link to="#Brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1 px-6">
          <InputGroup className="w-full bg-gray-200/50">
            <InputGroupInput placeholder="Search products..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <button className={`relative`}>
                      <ShoppingCart
                        className={`${sIcon} ${items.length > 0 ? "text-orange-500" : ""}`}
                      />
                      <span
                        className={`absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center text-xs font-bold`}
                      >
                        {items.length}
                      </span>
                    </button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My Cart</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <DialogContent className="max-w-lg">
              <DialogHeader className=" sticky top-0 z-10">
                <DialogTitle>My Cart</DialogTitle>
                <DialogDescription>
                  Products you have added to your cart.
                </DialogDescription>
              </DialogHeader>
              {items.length !== 0 && (
                <div className="space-y-3 max-h-[calc(80vh-80px)] overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />

                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.productId)}
                          className="w-8 h-8 rounded border hover:bg-gray-100"
                        >
                          <Minus size={16} className="mx-auto" />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.productId)}
                          className="w-8 h-8 rounded border hover:bg-gray-100"
                        >
                          <Plus size={16} className="mx-auto" />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="sticky bottom-0 z-10 bg-white">
                    <div className="flex justify-between border-t pt-3 font-semibold text-lg">
                      <span>Total</span>
                      <span>${totalPrice()}</span>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={goCart}>Buy</Button>
                    </div>
                  </div>
                </div>
              )}
              {items.length === 0 && (
                <>
                  <div className="flex items-center justify-center text-gray-500">
                    Your cart is empty.
                  </div>
                  <Button onClick={() => setIsOpen(false)}>close</Button>
                </>
              )}
            </DialogContent>
          </Dialog>
          {!user && <Button onClick={goToLogin}>Login</Button>}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-sm"
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
    </div>
  );
};

export default Header;
