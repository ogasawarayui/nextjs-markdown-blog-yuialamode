import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12 px-2">
        {/* デスクトップ版では「新咲結菜 OFFICIAL WEBSITE」を表示 */}
        <Link href="/" className="text-2xl font-bold hidden sm:block whitespace-nowrap">
          新咲結菜 OFFICAL WEBSITE
        </Link>
        {/* モバイル版では「新咲結菜」だけを表示 */}
        <Link href="/" className="text-2xl sm:text-base font-bold sm:hidden">
          新咲結菜
        </Link>
        <div className="flex space-x-4">
        <Link href="https://twitter.com/@yuialamode">
          <Image
            src="/x.svg" // ここに画像のパスを指定
            width={30} // 画像の幅を指定
            height={30} // 画像の高さを指定
            alt="X"
          />
        </Link>
        <Link href="https://youtube.com/@yuialamode">
          <Image
            src="/youtube.svg" // ここに画像のパスを指定
            width={30} // 画像の幅を指定
            height={30} // 画像の高さを指定
            alt="youtube"
          />
        </Link>
        <Link href="https://instagram.com/yuialamode">
          <Image
            src="/instagram.svg" // ここに画像のパスを指定
            width={30} // 画像の幅を指定
            height={30} // 画像の高さを指定
            alt="instagram"
          />
        </Link>
        <Link href="http://www.tiktok.com/@yuialamode">
          <Image
            src="/tiktok.svg" // ここに画像のパスを指定
            width={30} // 画像の幅を指定
            height={30} // 画像の高さを指定
            alt="tiktok"
          />
        </Link>
        </div>
        </div>
    </header>
  );
};

export default Header;