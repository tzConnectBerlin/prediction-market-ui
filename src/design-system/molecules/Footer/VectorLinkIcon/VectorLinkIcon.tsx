export interface VectorLinkIconProps {
  width?: number;
  height?: number;
}

export const VectorLinkIcon: React.FC<VectorLinkIconProps> = ({ width = 10, height = 12 }) => {
  return (
    <svg viewBox="0 0 10 12" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.96461 1.05338L10.0002 7.88981C10.0002 8.15426 9.80879 8.36974 9.56838 8.36974C9.32798 8.36974 9.13654 8.15916 9.13654 7.89471L9.10538 2.16014L0.744591 11.357C0.575416 11.548 0.299395 11.548 0.13022 11.357C-0.0434067 11.1709 -0.0434067 10.8722 0.13022 10.6812L8.49101 1.48433L3.27776 1.45495C3.03735 1.45005 2.84592 1.23947 2.84592 0.975024C2.84592 0.710578 3.0418 0.5 3.28221 0.5L9.49715 0.539177C9.78208 0.539177 9.95125 0.749755 9.96461 1.05338Z"
        fill="#0E61F6"
      />
    </svg>
  );
};
