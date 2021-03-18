import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from 'react';

export interface WrappedComponentProps {
  name?: string;
  onClose?: (data?: any) => void;
  open?: boolean;
  ref?: any;
  [props: string]: any;
}

type WrappedComponentRef = any;

type WrappedComponent =
  | ForwardRefExoticComponent<
      WrappedComponentProps & RefAttributes<WrappedComponentRef>
    >
  | React.ComponentType<any>;

type WidthDimmer = (
  wrappedComponent: WrappedComponent
) => ForwardRefExoticComponent<WrappedComponentProps>;

const withDimmer: WidthDimmer = function withDimmer(WrappedComponent) {
  return forwardRef<WrappedComponentProps, any>(function ComponentWidthDimmer(
    { name, open, onClose, ...rest },
    ref
  ) {
    // WrappedComponent를 닫는다.
    const handleClickDimmer = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.stopPropagation();

      console.log('[withDimmer]', name, open);
      // Controlled Component
      if (onClose) {
        onClose();
      }
    };

    return (
      <>
        {/* <Dimmer invisible={open} onClick={handleClickDimmer} /> */}
        <WrappedComponent
          {...rest}
          open={open}
          ref={ref}
          onClose={onClose}
          style={{ zIndex: 1500 }}
        />
      </>
    );
  });
};

export default withDimmer;
