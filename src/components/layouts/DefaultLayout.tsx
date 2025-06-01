import type { FC, ReactNode } from 'react';
import { Footer } from '../common/Footer';

interface DefaultLayoutTypes {
  children: ReactNode | ReactNode[];
}

export const DefaultLayout: FC<DefaultLayoutTypes> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen min-w-full flex items-center flex-col m-0 overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
};
