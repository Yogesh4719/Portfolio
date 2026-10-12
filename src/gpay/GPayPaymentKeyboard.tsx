const assetPathPrefix = "/gpay/80-1240";
const imgNumberKeyboard = `${assetPathPrefix}/480c7.svg`;
const imgRectangle = `${assetPathPrefix}/2f41c.svg`;
const imgVector = `${assetPathPrefix}/48668.svg`;
const imgVector1 = `${assetPathPrefix}/a1625.svg`;
const imgGroup5 = `${assetPathPrefix}/9aed2.svg`;
const imgGroup4 = `${assetPathPrefix}/9608b.svg`;
const imgGroup3 = `${assetPathPrefix}/1e6f2.svg`;
const imgActionButton = `${assetPathPrefix}/b476c.svg`;
const imgBack = `${assetPathPrefix}/0cdc1.svg`;
const imgClose = `${assetPathPrefix}/7aa16.svg`;
const imgSecure = `${assetPathPrefix}/84158.svg`;
const imgMenu = `${assetPathPrefix}/40487.svg`;
const imgReport = `${assetPathPrefix}/4064e.svg`;
const imgClose1 = `${assetPathPrefix}/b92ee.svg`;
const imgWifi = `${assetPathPrefix}/c465f.svg`;
const imgBattery = `${assetPathPrefix}/c740a.svg`;

type AndroidKeyboardProps = {
  className?: string;
  actionButton?: "Next";
  inputMethod?: "NumberDecimal";
  theme?: "Dark";
};

function AndroidKeyboard({ className, actionButton = "Next", inputMethod = "NumberDecimal", theme = "Dark" }: AndroidKeyboardProps) {
  return (
    <div className={className || "h-[206px] overflow-clip relative w-[360px]"} data-node-id="80:3017">
      <div className="absolute contents inset-0" data-node-id="80:3018" data-name="Page 1">
        <div className="absolute contents inset-0" data-node-id="80:3019" data-name="Number Keyboard">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNumberKeyboard} />
          <div className="absolute contents inset-[74.76%_26.11%_3.88%_50.56%]" data-node-id="80:3021" data-name="dot">
            <div className="absolute inset-[74.76%_26.11%_3.88%_50.56%]" data-node-id="80:3022" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[75.24%_36.31%_6.31%_61.19%] leading-[normal] text-[#fcffff] text-[32px] whitespace-nowrap" data-node-id="80:3025" style={{ fontVariationSettings: '"wdth" 100' }}>
              .
            </p>
          </div>
          <div className="absolute contents inset-[74.76%_50.83%_3.88%_25.83%]" data-node-id="80:3026" data-name="0">
            <div className="absolute inset-[74.76%_50.83%_3.88%_25.83%]" data-node-id="80:3027" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[76.21%_60.14%_6.8%_35.14%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3030" style={{ fontVariationSettings: '"wdth" 100' }}>
              0
            </p>
          </div>
          <div className="absolute contents inset-[74.76%_75.56%_3.88%_1.11%]" data-node-id="80:3031" data-name="*#">
            <div className="absolute contents inset-[74.76%_75.56%_3.88%_1.11%]" data-node-id="80:3032" data-name="Rectangle">
              <div className="absolute inset-[74.76%_75.56%_3.88%_1.11%]" data-node-id="80:3033" data-name="Vector">
                <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector} />
                </div>
              </div>
              <div className="absolute inset-[74.76%_75.56%_3.88%_1.11%]" data-node-id="80:3034" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
              </div>
              <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[76.21%_86.59%_5.34%_11.47%] leading-[normal] text-[#fcffff] text-[32px] whitespace-nowrap" data-node-id="80:3035" style={{ fontVariationSettings: '"wdth" 100' }}>
                ,
              </p>
            </div>
          </div>
          <div className="absolute contents inset-[50.97%_26.11%_27.67%_50.56%]" data-node-id="80:3036" data-name="9">
            <div className="absolute inset-[50.97%_26.11%_27.67%_50.56%]" data-node-id="80:3037" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[52.43%_35.42%_30.58%_59.86%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3040" style={{ fontVariationSettings: '"wdth" 100' }}>
              9
            </p>
          </div>
          <div className="absolute contents inset-[50.97%_50.83%_27.67%_25.83%]" data-node-id="80:3041" data-name="8">
            <div className="absolute inset-[50.97%_50.83%_27.67%_25.83%]" data-node-id="80:3042" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[52.43%_60.14%_30.58%_35.14%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3045" style={{ fontVariationSettings: '"wdth" 100' }}>
              8
            </p>
          </div>
          <div className="absolute contents inset-[50.97%_75.56%_27.67%_1.11%]" data-node-id="80:3046" data-name="7">
            <div className="absolute inset-[50.97%_75.56%_27.67%_1.11%]" data-node-id="80:3047" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[52.43%_84.86%_30.58%_10.42%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3050" style={{ fontVariationSettings: '"wdth" 100' }}>
              7
            </p>
          </div>
          <div className="absolute contents inset-[27.18%_26.11%_51.46%_50.56%]" data-node-id="80:3051" data-name="6">
            <div className="absolute inset-[27.18%_26.11%_51.46%_50.56%]" data-node-id="80:3052" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[28.64%_35.42%_54.37%_59.86%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3055" style={{ fontVariationSettings: '"wdth" 100' }}>
              6
            </p>
          </div>
          <div className="absolute contents inset-[27.18%_50.83%_51.46%_25.83%]" data-node-id="80:3056" data-name="5">
            <div className="absolute inset-[27.18%_50.83%_51.46%_25.83%]" data-node-id="80:3057" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[28.64%_60.14%_54.37%_35.14%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3060" style={{ fontVariationSettings: '"wdth" 100' }}>
              5
            </p>
          </div>
          <div className="absolute contents inset-[27.18%_75.56%_51.46%_1.11%]" data-node-id="80:3061" data-name="4">
            <div className="absolute inset-[27.18%_75.56%_51.46%_1.11%]" data-node-id="80:3062" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[28.64%_84.86%_54.37%_10.42%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3065" style={{ fontVariationSettings: '"wdth" 100' }}>
              4
            </p>
          </div>
          <div className="absolute contents inset-[3.4%_26.11%_75.24%_50.56%]" data-node-id="80:3066" data-name="3">
            <div className="absolute inset-[3.4%_26.11%_75.24%_50.56%]" data-node-id="80:3067" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[4.85%_35.42%_78.16%_59.86%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3070" style={{ fontVariationSettings: '"wdth" 100' }}>
              3
            </p>
          </div>
          <div className="absolute contents inset-[3.4%_50.83%_75.24%_25.83%]" data-node-id="80:3071" data-name="2">
            <div className="absolute inset-[3.4%_50.83%_75.24%_25.83%]" data-node-id="80:3072" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[4.85%_60.14%_78.16%_35.14%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3075" style={{ fontVariationSettings: '"wdth" 100' }}>
              2
            </p>
          </div>
          <div className="absolute contents inset-[3.4%_75.56%_75.24%_1.11%]" data-node-id="80:3076" data-name="1">
            <div className="absolute inset-[3.4%_75.56%_75.24%_1.11%]" data-node-id="80:3077" data-name="Rectangle">
              <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
                <img alt="" className="block max-w-none size-full" src={imgRectangle} />
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Roboto:Regular'] font-normal inset-[4.85%_84.86%_78.16%_10.42%] leading-[normal] text-[#fcffff] text-[30px] whitespace-nowrap" data-node-id="80:3080" style={{ fontVariationSettings: '"wdth" 100' }}>
              1
            </p>
          </div>
          <div className="absolute inset-[3.4%_1.11%_75.24%_75.56%]" data-node-id="80:3081">
            <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup5} />
            </div>
          </div>
          <div className="absolute inset-[27.18%_1.11%_51.46%_75.56%]" data-node-id="80:3086">
            <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup4} />
            </div>
          </div>
          <div className="absolute inset-[50.97%_1.11%_27.67%_75.56%]" data-node-id="80:3091">
            <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup3} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-[74.76%_1.11%_3.88%_75.56%]" data-node-id="80:3096" data-name="Action button">
        <div className="absolute inset-[0_-1.19%_-4.55%_-1.19%]">
          <img alt="" className="block max-w-none size-full" src={imgActionButton} />
        </div>
      </div>
    </div>
  );
}

export default function MoneyTransfer() {
  return (
    <div className="bg-white relative size-full" data-node-id="80:1240" data-name="Money transfer">
      <div className="absolute bg-[#0b57cf] content-stretch flex gap-[10px] items-center justify-center p-[14px] right-[16px] rounded-[12px] top-[555px] w-[361px]" data-node-id="80:9161" data-name="Pay">
        <div className="[word-break:break-word] flex flex-col font-['Roboto:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.5px] whitespace-nowrap" data-node-id="80:9162" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal]">Pay ₹3000</p>
        </div>
        <div className="flex items-center justify-center relative shrink-0 size-[24px]" data-node-id="80:9163">
          <div className="flex-none rotate-90">
            <div className="relative size-[24px]" data-name="Back">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBack} />
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[206px] left-1/2 top-[98px] w-[393px]" data-node-id="80:1245" data-name="Transaction">
        <div className="-translate-x-1/2 absolute bg-[#f9fafe] content-stretch flex gap-[4px] items-center justify-center left-1/2 px-[12px] py-[6px] rounded-[4px] top-[182px]" data-node-id="80:1246" data-name="note">
          <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#454647] text-[10px] whitespace-nowrap" data-node-id="80:1247" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal]">Shopping</p>
          </div>
          <div className="relative shrink-0 size-[12px]" data-node-id="80:9182" data-name="Close">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClose} />
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Roboto:Medium'] font-medium justify-center leading-[0] left-[calc(50%-61.5px)] text-[#1f1f1f] text-[0px] top-[154px] whitespace-nowrap" data-node-id="80:1248" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="font-['Roboto:Regular'] font-normal">
            <span className="leading-[34px] text-[30px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              ₹
            </span>
            <span className="leading-[34px] text-[40px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` 3,000`}</span>
          </p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] left-[calc(50%-83.5px)] text-[#1f1f1f] text-[14px] top-[108.5px] tracking-[0.5px] whitespace-nowrap" data-node-id="80:1249" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal]">State Bank Of India 1090</p>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[4px] items-center left-[calc(50%-0.5px)] top-[71px]" data-node-id="80:1250" data-name="secure">
          <div className="relative shrink-0 size-[16px]" data-node-id="80:1251" data-name="secure">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSecure} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#1f1f1f] text-[0px] tracking-[0.5px] whitespace-nowrap" data-node-id="80:1253" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="text-[14px]">
              <span className="leading-[normal] text-[#1f1f1f]">{`Banking name: `}</span>
              <span className="leading-[normal]">Yogesh</span>
            </p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] left-[calc(50%-42.5px)] text-[#1f1f1f] text-[16px] top-[57.5px] tracking-[0.5px] whitespace-nowrap" data-node-id="80:1254" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal]">Paying David</p>
        </div>
        <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-0" data-node-id="80:1255" data-name="user">
          <div className="absolute bg-[#0866c4] border border-[#c6c6c6] border-solid left-[177px] rounded-[120px] size-[40px] top-0" data-node-id="80:1256" data-name="bg" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Roboto:Regular'] font-normal h-[27.368px] justify-center leading-[0] left-[calc(50%+0.5px)] text-[22px] text-center text-white top-[calc(50%-81.95px)] w-[14.737px]" data-node-id="80:1257" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal]">D</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[29px] items-center justify-center left-1/2 top-[364px] w-[327px]" data-node-id="80:9168">
        <div className="content-stretch flex gap-[29px] items-center relative shrink-0" data-node-id="80:9169">
          <div className="bg-[#3a81f1] content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-node-id="80:9170" data-name="note">
            <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap" data-node-id="80:9171" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]">Shopping</p>
            </div>
          </div>
          <div className="bg-[#f9fafe] content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-node-id="80:9172" data-name="note">
            <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#454647] text-[10px] whitespace-nowrap" data-node-id="80:9173" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]">{`Food Delivery `}</p>
            </div>
          </div>
          <div className="bg-[#f9fafe] content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-node-id="80:9174" data-name="note">
            <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#454647] text-[10px] whitespace-nowrap" data-node-id="80:9175" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]">Pay Friends</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[29px] items-center relative shrink-0" data-node-id="80:9176">
          <div className="bg-[#f9fafe] content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-node-id="80:9177" data-name="note">
            <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#454647] text-[10px] whitespace-nowrap" data-node-id="80:9178" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]">Bills</p>
            </div>
          </div>
          <div className="bg-[#f9fafe] content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-node-id="80:9179" data-name="note">
            <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#454647] text-[10px] whitespace-nowrap" data-node-id="80:9180" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]">Petrol</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center right-[14px] size-[24px] top-[56px]" data-node-id="80:1271">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[24px]" data-name="Menu">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMenu} />
          </div>
        </div>
      </div>
      <div className="absolute left-[311px] size-[24px] top-[56px]" data-node-id="80:1273" data-name="Report">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgReport} />
      </div>
      <div className="absolute left-[14px] size-[24px] top-[56px]" data-node-id="80:1275" data-name="Close">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClose1} />
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] left-[calc(50%-35.5px)] text-[12px] text-black top-[336.5px] tracking-[0.5px] whitespace-nowrap" data-node-id="80:9166" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal]">Quick Notes</p>
      </div>
      <AndroidKeyboard className="absolute h-[225px] left-0 overflow-clip top-[627px] w-[393px]" />
      <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-between left-1/2 overflow-clip px-[24px] py-[9px] top-0 w-[393px]" data-node-id="80:1278" data-name="Status">
        <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0" data-node-id="80:1279" data-name="time">
          <p className="[word-break:break-word] font-['Roboto:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[17px] text-black tracking-[-0.68px] whitespace-nowrap" data-node-id="80:1280">
            9:41
          </p>
        </div>
        <div className="h-[14px] relative shrink-0 w-[76px]" data-node-id="80:1282" data-name="status">
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[4px] items-center justify-end right-0 top-1/2" data-node-id="80:1283" data-name="status">
            <div className="h-[14px] overflow-clip relative shrink-0 w-[20px]" data-node-id="80:1284" data-name="signal">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[12px] left-[calc(50%+7.95px)] rounded-[1px] top-1/2 w-[3.2px]" data-node-id="80:1285" data-name="Bar 4" />
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[9.6px] left-[calc(50%+2.65px)] rounded-[1px] top-[calc(50%+1.2px)] w-[3.2px]" data-node-id="80:1286" data-name="Bar 3" />
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[7px] left-[calc(50%-2.65px)] rounded-[1px] top-[calc(50%+2.5px)] w-[3.2px]" data-node-id="80:1287" data-name="Bar 2" />
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[4.6px] left-[calc(50%-7.95px)] rounded-[1px] top-[calc(50%+3.7px)] w-[3.2px]" data-node-id="80:1288" data-name="Bar 1" />
            </div>
            <div className="h-[12px] overflow-clip relative shrink-0 w-[20px]" data-node-id="80:1289" data-name="wifi">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11px] left-1/2 top-1/2 w-[15.675px]" data-node-id="80:1290" data-name="wifi">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWifi} />
              </div>
            </div>
            <div className="h-[14px] relative shrink-0 w-[28px]" data-node-id="80:1294" data-name="battery">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}