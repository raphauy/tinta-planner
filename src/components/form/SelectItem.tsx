import React, { ForwardedRef } from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { FiChevronUp, FiChevronsDown } from 'react-icons/fi';
import { BsCheck } from 'react-icons/bs';

interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}


const SelectItem = React.forwardRef(
  ({ children, className, ...props }: SelectItemProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    return (
      <Select.Item
        className={classnames(
          // ...
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <BsCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
SelectItem.displayName = 'SelectItem';


export default SelectItem;
