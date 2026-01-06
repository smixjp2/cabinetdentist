import type { SVGProps } from 'react';

export function Tooth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.31 4.54A5.3 5.3 0 0 1 12 4a5.3 5.3 0 0 1 2.69.54" />
      <path d="M4.5 8.22A5.3 5.3 0 0 1 8 5.76" />
      <path d="M19.5 8.22A5.3 5.3 0 0 0 16 5.76" />
      <path d="M4.54 13.5A5.3 5.3 0 0 0 7 19.43l-2.5 1.07" />
      <path d="M19.46 13.5A5.3 5.3 0 0 1 17 19.43l2.5 1.07" />
      <path d="M_12_18.25_a5.3_5.3_0_0_1_0-12.5_m_1.17_15.1_1.17_1.17_1.17-1.17_" />
      <path d="M9.5 10.5h5" />
      <path d="M9.5 13.5h5" />
    </svg>
  );
}
