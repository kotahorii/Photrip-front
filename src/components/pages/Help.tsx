import { Disclosure } from '@headlessui/react'
import { DisclosureButton } from 'components/molecules/disclosure/DisclosureButton'
import { DisclosurePanel } from 'components/molecules/disclosure/DisclosurePanel'
import { HelpPageText } from 'components/molecules/disclosure/HelpPageText'
import { useHelp } from 'hooks/useHelp'

export const Help = () => {
  const {
    isOpenHeaderDisclosure,
    isOpenMainDisclosure,
    isOpenMyPageDisclosure,
    isOpenModalDisclosure,
    isOpenDetailDisclosure,
    toggleHeaderDisclosure,
    toggleMainDisclosure,
    toggleMyPageDisclosure,
    toggleModalDisclosure,
    toggleDetailDisclosure,
  } = useHelp()
  return (
    <div className="w-full min-h-screen font-notoSans flex flex-col text-gray-500 items-center bg-gray-50">
      <div className=" max-w-lg w-full min-h-screen p-1">
        <h1 className="flex flex-row items-center justify-center text-3xl w-full p-8 font-semibold">
          <div className="h-14 w-14">
            <img
              className="h-full w-full"
              src={`${process.env.PUBLIC_URL}/application_icon.png`}
              alt="application-icon"
            />
          </div>
          <span className="font-merriweather">Photrip</span>
        </h1>
        <p className="text-xl">
          <span className="font-merriweather">Photrip</span>
          は旅行の体験を共有したいユーザーと、旅行に行きたいと思うユーザーを繋ぐためのサービスです。
        </p>
        <div className=" flex flex-col space-y-2 p-2 w-full mt-10 bg-blue-100 rounded">
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenHeaderDisclosure}
              toggleOpen={toggleHeaderDisclosure}
            >
              ヘッダーの機能一覧
            </DisclosureButton>
            <DisclosurePanel>
              <HelpPageText title="アイコン">
                ヘッダーのアイコンを押すことで、ページのトップにスクロールすることができます。
              </HelpPageText>
              <HelpPageText title="投稿一覧">
                投稿一覧ページに遷移します。
                <br />
                ※スマホサイズの場合はメニューに表示されます。
              </HelpPageText>
              <HelpPageText title="マイページ">
                マイページに遷移します。
                <br />
                ※スマホサイズの場合はメニューに表示されます。
              </HelpPageText>
              <HelpPageText title="ユーザーアイコン">
                自分の投稿に対するいいね数、評価数に応じてバッジの色が変化します。
                アイコンをクリックすることで、メニューが開きます。
              </HelpPageText>
              <HelpPageText title="メニュー">
                プロフィール編集を押すとユーザー情報編集モーダルが表示されます。
                <br />
                新規投稿を押すと投稿用モーダルが表示されます。
              </HelpPageText>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenMainDisclosure}
              toggleOpen={toggleMainDisclosure}
            >
              メインページの機能一覧
            </DisclosureButton>
            <DisclosurePanel>
              <HelpPageText title="検索フォーム">
                キーワードを入力すると、タグまたはタイトルが一致する投稿だけを表示することができます。
                ×ボタンを押すことで入力をクリアすることができます。
              </HelpPageText>
              <HelpPageText title="都道府県セレクト">
                選択した都道府県の投稿だけを表示することができます。
              </HelpPageText>
              <HelpPageText title="並び替えボタン">
                投稿を「投稿された日付が新しい順」、「投稿に対するいいねの多い順」、「投稿に対する評価の平均値が高い順」、「投稿に対する評価の数が多い順」
                に並び替えることができます。
              </HelpPageText>
              <HelpPageText title="投稿カード">
                カードをクリックすることで、投稿詳細ページに遷移することができます。
                ハートボタンを押すことでいいねすることができます。
                自分の投稿の×ボタンを押すことで確認モーダルが表示されます。
              </HelpPageText>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenMyPageDisclosure}
              toggleOpen={toggleMyPageDisclosure}
            >
              マイページの機能一覧
            </DisclosureButton>
            <DisclosurePanel>
              <HelpPageText title="タブメニュー">
                選択中のものは文字の色が変化して、アンダーラインが表示されます。
              </HelpPageText>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenDetailDisclosure}
              toggleOpen={toggleDetailDisclosure}
            >
              詳細ページの機能一覧
            </DisclosureButton>
            <DisclosurePanel>
              <HelpPageText title="表示画像">
                クリックすることで拡大表示することができます。
              </HelpPageText>
              <HelpPageText title="レストラン / ホテル検索ボタン">
                クリックすると周辺の店舗の自動検索結果が表示されます。
                <br />
                ※検索結果が多すぎる場合や、周辺に店舗がない場合は表示されないことがあります。
                <br />
                店名、「レビューを確認する」を押すと、外部サイトのタブが開きます。
              </HelpPageText>
              <HelpPageText title="タグフォーム">
                自身の投稿にタグを追加することができます。
                追加したタグは×ボタンで削除することができます。
              </HelpPageText>
              <HelpPageText title="コメントフォーム">
                旅行に行った後に、感想をコメントで伝えることができます。
                フォームを入力後、紙飛行機アイコンで送信できます。
                また、評価を5段階でつけることができます。
              </HelpPageText>
              <HelpPageText title="「詳細を見る」ボタン">
                投稿の詳細と、投稿したユーザーが表示されます。
                ユーザーのアイコンをホバーすると、そのユーザーの自己紹介と、そのユーザーが今までにもらったいいね、評価の数を確認することができます。
              </HelpPageText>
              <HelpPageText title="Google Map">
                旅先の風景や、周辺の施設をGoogle Mapで確認することができます。
              </HelpPageText>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenModalDisclosure}
              toggleOpen={toggleModalDisclosure}
            >
              モーダルの機能一覧
            </DisclosureButton>
            <DisclosurePanel>
              <HelpPageText title="新規投稿/投稿編集モーダル">
                情報を入力し、「投稿/編集」ボタンを押すことで、新規投稿、編集ができます。
                旅行先の住所は、郵便番号を入力し、自動入力のボタンを押すことで自動入力できます。
                モーダルの外をクリックすることで、モーダルを閉じることができます。
              </HelpPageText>
              <HelpPageText title="ユーザー編集モーダル">
                モーダルの外をクリックすることで、モーダルを閉じることができます。
              </HelpPageText>
              <HelpPageText title="投稿削除モーダル">
                モーダルの外か「キャンセル」を押すと、モーダルが閉じます。「削除」を押すことで、投稿を削除することができます。
              </HelpPageText>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  )
}
