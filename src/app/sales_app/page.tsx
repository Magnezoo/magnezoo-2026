export default function SalesAppCampainPage() {
  return (
    <div className="flex text-center min-h-screen items-center justify-center bg-[#FFEECE] font-sans text-black">
      <main>
        <h1 className="text-xl font-bold mb-2">【物販企画】</h1>
        <h2 className="text-2xl font-bold mb-8">
          あなたのウチの子が商品に！？
        </h2>
        <p>
          Magnezoo
          物販企画(仮)は、生徒から募集した「ウチの子（ペット）」の写真をもとに制作する、
          <br />
          ネット企画Magnezoo発の物販企画です。
          <br />
          ここでしか手に入らない、尊くて愛しい限定アイテムを展開します。
        </p>
        <br />
        <strong>
          <h2>写真の応募方法</h2>
        </strong>
        <br />
        <p>
          この企画は、
          <br />
          <strong>
            生徒から募集した「ウチの子（ペット）」の写真をもとに制作されます。
          </strong>
          <br />
          応募方法は以下の通りです。
        </p>
        <br />
        <ol>
          <li>
            1.写真を撮る：
            <br />
            あなたのウチの子（ペット等）のかわいい写真を撮ってください！
            <br />
            できるだけ高画質で、正方形にカットできるような構図が望ましいです。
            <br />
            <strong>地域猫や犬カフェ・猫カフェ等の写真も歓迎します！</strong>
          </li>
          <br />
          <li>
            2.応募フォームに記入する：
            <br />
            以下の応募フォームに必要事項を記入してください。
          </li>
          <br />
          <li>
            3.写真をアップロードする：
            <br />
            応募フォーム内で、撮った写真をアップロードしてください。
          </li>
          <br />
          <li>
            4.送信する：
            <br />
            すべての情報が入力されたら、応募フォームを送信してください。
          </li>
        </ol>
        <p>
          応募された写真は、企画チームによって選定され、商品化される可能性があります。
          <br />
          選ばれた方には、後日ご連絡いたします。
        </p>
        <br />
        <strong>
          <h2>注意事項</h2>
        </strong>
        <br />
        <ul>
          <li>
            応募は<strong>何回でもOK</strong>です！
          </li>
          <li>
            写真はオリジナルのもので、他人の著作権を侵害しないものに限ります。
            <ul>
              <li>人が写っている写真は望ましくありません。</li>
              <li>
                <strong>猫カフェや犬カフェ等の写真も歓迎します。</strong>
                <br />
                ただし、他のお客さん等が写り込まないように注意してください。
              </li>
            </ul>
          </li>
          <li>選ばれた写真は、商品化のために加工されることがあります。</li>
          <li>応募された写真は返却いたしませんので、ご了承ください。</li>
        </ul>
        {/* TODO: 応募フォームのボタン追加 */}

        {/* TODO: 大きく目立つようにする */}
        <span className="highlight">みなさんのご応募お待ちしています！</span>
      </main>
    </div>
  );
}
