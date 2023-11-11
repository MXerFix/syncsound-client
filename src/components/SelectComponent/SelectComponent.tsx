import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { isMobile } from '../../App';

const SelectComponent = ({ data, title, state, setState, className }: { data: any[], title: string, state: string, setState: Function, className?: string }) => (
  <Select.Root defaultValue={state} onValueChange={e => setState(e)} >
    <Select.Trigger
      className={`inline-flex items-center justify-center transition duration-150 rounded px-5 h-[43px] text-[18px] leading-none gap-[5px] bg-[#222] text-white shadow-[0_2px_10px] shadow-black/10 hover:bg-[#333]  data-[placeholder]:text-white outline-none ${isMobile && "mobile-catalog-select"} `}
      aria-label="Food"
    >
      <Select.Value placeholder={`Все ${title.toLowerCase()}`} />
      <Select.Icon className="text-white">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-[#222] rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-333 text-white cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            {/* <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Fruits
            </Select.Label> */}
            <SelectItem value='all' >
              Все {title.toLowerCase()}
            </SelectItem>
            {data.map((item) => (
              <SelectItem key={item.id} value={item.name} >
                {item.name}
              </SelectItem>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-333 text-white cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef(({ children, className, ...props }: any, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(
        (`text-[18px] leading-none transition duration-150 text-white rounded-[3px] flex items-center h-[43px] px-5 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#333] data-[highlighted]:text-white ${isMobile && "mobile-catalog-select"} `) ,
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute right-1 w-[25px] inline-flex items-center justify-center">
        <CheckIcon className='w-4 h-4' />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectComponent;