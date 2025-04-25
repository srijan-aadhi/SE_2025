"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currencies, Currency } from "@/hooks/currencies";
import { useQuery } from "@tanstack/react-query";
// import { useMutation } from "@tanstack/react-query";
// import { UpdateUserCurrency } from "@/app/wizard/_actions"; // Uncomment if you need mutation

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  React.useEffect(() => {
    if (!data) return;
    const userCurrency = Currencies.find(
      (currency) => currency.value === data.currency
    );
    if (userCurrency) setSelectedOption(userCurrency);
  }, [data]);

  // const mutation = useMutation({
  //   mutationFn: UpdateUserCurrency,
  // });

  if (isLoading) return <div>Loading user settings...</div>;
  if (isError) return <div>Failed to load user settings</div>;

  const ComboButton = (
    <Button variant="outline" className="w-full justify-start">
      {selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
    </Button>
  );

  const ComboList = (
    <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} />
  );

  return isDesktop ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{ComboButton}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        {ComboList}
      </PopoverContent>
    </Popover>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{ComboButton}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{ComboList}</div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                const selected = Currencies.find(
                  (c) => c.value === value
                );
                setSelectedOption(selected ?? null);
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
