import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {isZhHK ? '服務條款' : 'Terms of Service'}
            </h1>
            <p className="text-gray-300 text-lg">
              {isZhHK ? '最後更新日期: 2025年7月15日' : 'Last Updated: July 15, 2025'}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Introduction */}
              <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <p className="text-gray-200 leading-relaxed">
                  歡迎您使用 AI Formula（以下簡稱「本平台」）！
                </p>
                <p className="text-gray-200 leading-relaxed mt-4">
                  本服務條款（以下簡稱「本條款」）構成您與 AI Formula 之間具有法律約束力的協議。在您註冊、瀏覽或使用本平台提供的任何服務前，請務必詳細閱讀本條款。當您開始使用本平台服務時，即表示您已閱讀、瞭解並同意接受本條款的所有內容。
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. 服務說明 (Description of Service)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    本平台是一個專注於人工智慧 (AI) 領域的綜合性服務網站，其服務內容包括但不限於：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                    <li><strong className="text-yellow-400">AI 網站平台 (AI Web Platform):</strong> 提供 AI 相關資訊、文章、社群討論區及 AI 應用工具。</li>
                    <li><strong className="text-yellow-400">AI 教學 (AI Teaching):</strong> 提供線上工作坊、直播教學、一對一指導等互動式教學服務。</li>
                    <li><strong className="text-yellow-400">AI 課程 (AI Courses):</strong> 提供結構化的線上影音課程、學習教材、練習專案及結業證書（如適用）。</li>
                  </ul>
                  <p className="text-gray-200 mt-4">
                    本平台保留隨時新增、修改或終止各項服務內容的權利，恕不另行通知。
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. 使用者帳戶與責任 (User Accounts & Responsibilities)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">註冊義務:</h3>
                    <p className="text-gray-200">為使用本平台的完整服務（特別是付費課程），您可能需要註冊一個帳戶。您同意在註冊時提供您本人正確、最新及完整的資料。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">帳戶安全:</h3>
                    <p className="text-gray-200">您有責任維持您的帳戶密碼和帳號的機密安全。利用該密碼及帳號所進行的一切行動，您將負完全的責任。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">帳戶所有權:</h3>
                    <p className="text-gray-200">帳戶的所有權歸本平台所有，使用者在完成註冊後獲得帳戶的使用權。帳戶僅供您個人使用，不得轉讓、出借或與他人共用。</p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. 使用者行為準則 (Acceptable Use Policy)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    您同意不利用本平台服務從事任何違法或不當的活動，包括但不限於：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                    <li>上傳、張貼或公布任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法的文字、圖片或任何形式的檔案。</li>
                    <li>侵害他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。</li>
                    <li>未經授權，不得利用本平台提供的 AI 工具或服務從事商業行為，或用於開發與本平台競爭的產品。</li>
                    <li><strong className="text-red-400">嚴禁濫用 AI 功能:</strong> 不得利用本平台的 AI 工具生成或散播假訊息、仇恨言論、歧視性內容，或用於任何形式的非法、不道德活動。</li>
                    <li>在課程學習中，不得有作弊、抄襲作業或專案、代考等違反學術誠信的行為。</li>
                    <li>試圖探測、掃描或測試本平台系統或網路的弱點，或其它任何危害本平台網路安全的行為。</li>
                  </ul>
                  <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-200">
                      <strong>重要提醒:</strong> 若您有違反上述任一情事，本平台有權立即暫停或終止您的帳戶，並保留追究法律責任的權利。
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. 費用與付款 (Fees and Payment)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">付費服務:</h3>
                    <p className="text-gray-200">本平台的某些服務（例如：進階課程、一對一教學）需要付費購買。所有費用均以本平台網站上公佈的價格為準。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">付款方式:</h3>
                    <p className="text-gray-200">我們接受信用卡、PayPal 等付款方式。您同意提供有效且經授權的付款資訊。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">退款政策:</h3>
                    <p className="text-gray-200">關於付費課程或服務的退款政策，請參閱我們的退款政策頁面。一般而言，課程購買後 7 天內，且觀看時數未超過 10%，可申請全額退款。</p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. 智慧財產權 (Intellectual Property Rights)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">本平台內容:</h3>
                    <p className="text-gray-200">本平台上所有內容，包括但不限於文字、軟體、程式碼、影音、圖片、設計、商標、課程教材及 AI 模型架構（指本平台自行開發的部分），其智慧財產權均為本平台或其權利人所有。未經事前書面同意，您不得擅自重製、散布、改作、公開傳輸或以任何方式使用。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">使用者內容:</h3>
                    <p className="text-gray-200">您在本平台公開區域（如社群）所上傳或發布的內容，您仍保有其智慧財產權。但您同意授予本平台一個全球性、非專屬、無償、可轉授權的權利，以使用、重製、修改、散布這些內容，以便於提供和推廣本平台的服務。</p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. 免責聲明 (Disclaimers of Warranties)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">服務「現狀」提供:</h3>
                    <p className="text-gray-200">您明確瞭解並同意，本平台對各項服務不負任何明示或默示的擔保責任。本平台不保證服務將完全符合您的期望、不受干擾、及時提供、安全可靠或無錯誤。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">AI 內容的限制:</h3>
                    <p className="text-gray-200">AI 領域技術日新月異。本平台不保證所提供的教學內容、資訊或 AI 工具的輸出結果永遠是最新、最準確或最完整的。任何透過使用本平台服務而取得的資訊或建議，皆不構成任何形式的保證。您應自行判斷其適用性，並對您運用這些知識所產生的結果自行負責。</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">第三方連結:</h3>
                    <p className="text-gray-200">本平台可能包含連至第三方網站的連結。這些網站非由本平台所控制，我們對其內容、隱私權政策或行為概不負責。</p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. 責任限制 (Limitation of Liability)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    在法律允許的最大範圍內，在任何情況下，本平台及其管理人員、員工或代理人，均不對任何因您使用或無法使用本平台服務所造成的直接、間接、附帶、特殊、衍生性或懲罰性損害（包括但不限於利潤損失、資料遺失或商譽損失）承擔任何責任。
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. 條款修改 (Modification of Terms)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    本平台有權隨時修改本條款。修改後的條款將公布於本平台網站上，並自公布之日起生效。若您在條款修改後繼續使用本平台服務，將視為您已接受並同意該等修改。我們建議您定期查看本條款，以了解最新內容。
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">9. 終止服務 (Termination)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    若您違反本條款的任何規定，本平台有權不經通知，隨時暫停或永久終止您使用本平台服務的權利。您也可以隨時透過聯繫客服信箱來終止您的帳戶。
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">10. 準據法與管轄法院 (Governing Law and Jurisdiction)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    本條款之解釋與適用，以及與本條款有關的爭議，均應依照香港特別行政區法律予以處理，並以香港特別行政區法院為管轄法院。
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">11. 聯絡我們 (Contact Us)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    若您對本服務條款有任何疑問，歡迎隨時透過以下方式與我們聯繫：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                    <li><strong className="text-yellow-400">電子郵件:</strong> info@aiformula.com</li>
                    <li><strong className="text-yellow-400">聯絡表單:</strong> 透過我們的網站聯絡頁面</li>
                  </ul>
                </div>
              </section>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService; 