const assetPathPrefix = "/bitebuzz/98-2133";
const imgVarantOutlineTypeMail = `${assetPathPrefix}/26e31.svg`;
const imgVarantOutlineTypePlusSm = `${assetPathPrefix}/c5882.svg`;
const imgImage = `${assetPathPrefix}/3834f.png`;
const img22BurgerFreeDownloadPng2 = `${assetPathPrefix}/5230f.png`;
const imgBattery = `${assetPathPrefix}/56953.svg`;
const imgWifi = `${assetPathPrefix}/5e444.svg`;
const imgCellularConnection = `${assetPathPrefix}/6961e.svg`;
const imgIcon = `${assetPathPrefix}/e52db.svg`;
const imgIcon1 = `${assetPathPrefix}/6a1fc.svg`;
const imgIcon2 = `${assetPathPrefix}/1ee18.svg`;
const imgIcon3 = `${assetPathPrefix}/4d712.svg`;
const imgIcon4 = `${assetPathPrefix}/8e8c0.svg`;
const imgHome = `${assetPathPrefix}/0463b.svg`;
const imgBag = `${assetPathPrefix}/37e5b.svg`;
const imgMoreCircle = `${assetPathPrefix}/fdc8d.svg`;

type IconProps = {
  className?: string;
  type?: "mail" | "plus-sm";
  varant?: "Outline";
};

function Icon({ className, type = "mail", varant = "Outline" }: IconProps) {
  const isOutlineAndPlusSm = varant === "Outline" && type === "plus-sm";
  return (
    <div className={className || "relative size-[24px]"} id={isOutlineAndPlusSm ? "node-8_1232" : "node-8_808"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isOutlineAndPlusSm ? imgVarantOutlineTypePlusSm : imgVarantOutlineTypeMail} />
    </div>
  );
}

export default function Order() {
  return (
    <div className="bg-white relative size-full" data-node-id="98:2133" data-name="Order">
      <div className="absolute h-[44px] left-0 top-0 w-[375px]" data-node-id="98:2136" data-name="Other">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[44px] left-1/2 overflow-clip top-1/2 w-[375px]" data-node-id="I98:2136;58:478" data-name="iPhone X/Status Bars/Status Bar (Black)">
          <div className="absolute h-[11.333px] right-[14.67px] top-[17.33px] w-[24.328px]" data-node-id="I98:2136;58:480" data-name="Battery">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
          </div>
          <div className="absolute inset-[39.39%_11.74%_35.69%_84.19%]" data-node-id="I98:2136;58:484" data-name="Wifi">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWifi} />
          </div>
          <div className="absolute inset-[40.15%_17.16%_35.61%_78.31%]" data-node-id="I98:2136;58:488" data-name="Cellular Connection">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCellularConnection} />
          </div>
          <div className="absolute h-[20px] left-[21px] top-[12px] w-[54px]" data-node-id="I98:2136;58:493" data-name="Time Style">
            <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-[26px] not-italic text-[#101010] text-[0px] text-center top-[calc(50%-8px)] w-[54px]" data-node-id="I98:2136;58:494">
              <span className="leading-[20px] text-[14px]">9:4</span>
              <span className="leading-[20px] text-[14px]">1</span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[100px] h-[49px] items-center left-[24px] opacity-80 py-[12px] top-[44px] w-[327px]" data-node-id="98:2137" data-name="Top Navigation">
        <a className="bg-white border border-[#ededed] border-solid content-stretch cursor-pointer flex items-start p-[8px] relative rounded-[100px] shrink-0" data-node-id="I98:2137;87:1942" data-name="Back">
          <div className="relative shrink-0 size-[20px]" data-node-id="I98:2137;87:1943" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </a>
        <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[24px] relative shrink-0 text-[#101010] text-[24px] whitespace-nowrap" data-node-id="I98:2137;65:1174" style={{ fontVariationSettings: '"wdth" 100' }}>
          My Cart
        </p>
      </div>
      <div className="[word-break:break-word] absolute border border-[#ededed] border-solid content-stretch flex flex-col gap-[8px] items-start leading-[0] left-[29px] not-italic p-[12px] rounded-[16px] top-[444px] w-[327px]" data-node-id="98:2138" data-name="Information Payment">
        <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center min-w-full relative shrink-0 text-[#101010] text-[16px] w-[min-content]" data-node-id="98:2139">
          <p className="leading-[24px]">Payment Summary</p>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[14px] text-center whitespace-nowrap" data-node-id="98:2140" data-name="List">
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-[303px]" data-node-id="98:2141" data-name="Total">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#878787]" data-node-id="98:2142">
              <p className="leading-[20px]">Total Items (2)</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#101010]" data-node-id="98:2143">
              <p className="leading-[20px]">₹260</p>
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-[303px]" data-node-id="98:2144" data-name="Delivery">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#878787]" data-node-id="98:2145">
              <p className="leading-[20px]">Delivery Fee</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#101010]" data-node-id="98:2146">
              <p className="leading-[20px]">{`Free `}</p>
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-[303px]" data-node-id="98:2147" data-name="Discount">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#878787]" data-node-id="98:2148">
              <p className="leading-[20px]">Discount</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#fe8c00]" data-node-id="98:2149">
              <p>
                <span className="leading-[20px]">-</span>
                <span className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic">₹25</span>
              </p>
            </div>
          </div>
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-[303px]" data-node-id="98:2150" data-name="Total">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#878787]" data-node-id="98:2151">
              <p className="leading-[20px]">Total</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#101010]" data-node-id="98:2152">
              <p className="leading-[20px]">₹235</p>
            </div>
          </div>
        </div>
      </div>
      <a className="absolute bg-[#fe8c00] content-stretch cursor-pointer flex gap-[8px] items-center justify-center left-[31px] p-[16px] rounded-[100px] top-[652px] w-[327px]" data-node-id="98:2153" data-name="Button">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" data-node-id="I98:2153;58:453">
          Order Now
        </p>
      </a>
      <div className="absolute content-stretch flex flex-col h-[50px] items-end left-[25px] top-[157px] w-[325px]" data-node-id="98:2154" data-name="Promo Code">
        <div className="bg-[#fe8c00] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[100px] shrink-0 w-[327px]" data-node-id="98:2155" data-name="Input">
          <div className="bg-white border border-[#ededed] border-solid content-stretch flex gap-[8px] items-center p-[16px] relative rounded-[100px] shrink-0 w-full" data-node-id="I98:2155;43:144" data-name="Input">
            <div className="relative shrink-0 size-[20px]" data-node-id="I98:2155;43:145" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[20px] min-w-px not-italic relative text-[#c2c2c2] text-[14px]" data-node-id="I98:2155;43:146">
              Promo Code. . .
            </p>
          </div>
        </div>
        <div className="absolute bg-[#fe8c00] content-stretch flex gap-[8px] items-center justify-center left-[229px] px-[24px] py-[10px] rounded-[100px] top-[8px] w-[86px]" data-node-id="98:2156" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" data-node-id="I98:2156;58:453">
            Apply
          </p>
        </div>
      </div>
      <div className="absolute border-[#fe8c00] border-[0.5px] border-solid content-stretch flex gap-[8px] items-center justify-center left-[calc(50%+53.5px)] px-[24px] py-[8px] rounded-[100px] top-[104px] w-[109px]" data-node-id="98:2157" data-name="Button">
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#fe8c00] text-[10px] text-center whitespace-nowrap" data-node-id="I98:2157;58:741">
          Change Location
        </p>
      </div>
      <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[4px] items-start justify-center leading-[20px] left-[29px] not-italic text-[14px] text-center top-[100px] whitespace-nowrap" data-node-id="98:2158" data-name="Location">
        <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#878787]" data-node-id="98:2159">
          Delivery Location
        </p>
        <p className="capitalize font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#101010]" data-node-id="98:2160">
          778 white Field
        </p>
      </div>
      <div className="absolute bg-white content-stretch drop-shadow-[6px_6px_30px_rgba(0,0,0,0.04)] flex gap-[16px] h-[94px] items-center left-[25px] p-[12px] rounded-[12px] top-[226px]" data-node-id="98:2161" data-name="Card">
        <div className="relative shrink-0 size-[20px]" data-node-id="98:2162" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
        </div>
        <div className="h-[82px] relative rounded-[8px] shrink-0 w-[85px]" data-node-id="98:2163" data-name="Image 1">
          <div className="absolute inset-0 rounded-[8px]" data-node-id="98:2164" data-name="Image">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgImage} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="98:2165" data-name="Information">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-center whitespace-nowrap" data-node-id="98:2166" data-name="Name + Price">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[#101010] text-[16px]" data-node-id="98:2167">
              Chili Burger
            </p>
            <p className="font-['Inter:Bold'] font-bold leading-[20px] relative shrink-0 text-[#fe8c00] text-[14px]" data-node-id="98:2168">
              ₹180
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-[166px]" data-node-id="98:2169" data-name="Add+delete">
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="98:2170" data-name="Count">
              <div className="border border-[#ededed] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[28px]" data-node-id="98:2171" data-name="Min">
                <div className="absolute left-px size-[24px] top-px" data-node-id="98:2172" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[#101010] text-[14px] whitespace-nowrap" data-node-id="98:2173">
                1
              </p>
              <div className="border border-[#ededed] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[28px]" data-node-id="98:2174" data-name="Add">
                <Icon className="absolute left-px size-[24px] top-px" type="plus-sm" />
              </div>
            </div>
            <div className="relative shrink-0 size-[20px]" data-node-id="98:2176" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch drop-shadow-[6px_6px_30px_rgba(0,0,0,0.04)] flex gap-[16px] h-[94px] items-center left-[28px] p-[12px] rounded-[12px] top-[331px]" data-node-id="98:2177" data-name="Card">
        <div className="relative shrink-0 size-[20px]" data-node-id="98:2178" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
        </div>
        <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[76px]" data-node-id="98:2275" data-name="2-2-burger-free-download-png 2">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={img22BurgerFreeDownloadPng2} />
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="98:2181" data-name="Information">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-center whitespace-nowrap" data-node-id="98:2182" data-name="Name + Price">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[#101010] text-[16px]" data-node-id="98:2183">
              Aloo Tikki
            </p>
            <p className="font-['Inter:Bold'] font-bold leading-[20px] relative shrink-0 text-[#fe8c00] text-[14px]" data-node-id="98:2184">
              ₹80
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-[166px]" data-node-id="98:2185" data-name="Add+delete">
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="98:2186" data-name="Count">
              <div className="border border-[#ededed] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[28px]" data-node-id="98:2187" data-name="Min">
                <div className="absolute left-px size-[24px] top-px" data-node-id="98:2188" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[#101010] text-[14px] whitespace-nowrap" data-node-id="98:2189">
                1
              </p>
              <div className="border border-[#ededed] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[28px]" data-node-id="98:2190" data-name="Add">
                <Icon className="absolute left-px size-[24px] top-px" type="plus-sm" />
              </div>
            </div>
            <div className="relative shrink-0 size-[20px]" data-node-id="98:2192" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch drop-shadow-[0px_-3px_7.5px_rgba(0,0,0,0.1)] flex items-center justify-between left-px px-[48px] right-[-1px] rounded-tl-[20px] rounded-tr-[20px] top-[728px]" data-node-id="98:2306">
        <div className="flex flex-row items-center self-stretch" data-node-id="98:2307">
          <a className="content-stretch cursor-pointer flex flex-col gap-[16px] h-full items-center px-[14px] relative shrink-0">
            <div className="bg-white h-[4px] relative rounded-bl-[28px] rounded-br-[28px] shrink-0 w-[32px]" data-node-id="98:2308" />
            <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pb-[18px] relative shrink-0 w-full" data-node-id="98:2309">
              <div className="relative shrink-0 size-[28px]" data-node-id="98:2310" data-name="Iconly/Bold/Home">
                <div className="absolute inset-[8.33%_10.42%]" data-node-id="I98:2310;29221:937" data-name="Home">
                  <div className="absolute inset-[-3.21%_-3.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgHome} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" data-node-id="98:2311" style={{ fontVariationSettings: '"wdth" 100' }}>
                Home
              </p>
            </div>
          </a>
        </div>
        <div className="h-[84px] relative shrink-0 w-[61px]" data-node-id="98:2312">
          <div className="absolute bg-[#ff8a00] border-0 border-[#fe8c00] border-solid h-[4px] left-[14.5px] rounded-bl-[28px] rounded-br-[28px] top-0 w-[32px]" data-node-id="98:2313" />
          <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[14px] pb-[18px] top-[20px] w-[33px]" data-node-id="98:2314">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="98:2315">
              <div className="col-1 ml-0 mt-0 relative row-1 size-[28px]" data-node-id="98:2316" data-name="Iconly/Light/Bag">
                <div className="absolute inset-[9.49%_10.88%_10.42%_13.75%]" data-node-id="I98:2316;29221:1843" data-name="Bag">
                  <div className="absolute inset-[-3.34%_-3.55%]">
                    <img alt="" className="block max-w-none size-full" src={imgBag} />
                  </div>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] opacity-0 relative shrink-0 text-[#ff9431] text-[12px] text-center whitespace-nowrap" data-node-id="98:2317" style={{ fontVariationSettings: '"wdth" 100' }}>
              Home
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center self-stretch" data-node-id="98:2318">
          <a className="content-stretch cursor-pointer flex flex-col gap-[16px] h-full items-center px-[14px] relative shrink-0">
            <div className="bg-white h-[4px] relative rounded-bl-[28px] rounded-br-[28px] shrink-0 w-[32px]" data-node-id="98:2319" />
            <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pb-[18px] relative shrink-0 w-full" data-node-id="98:2320">
              <div className="relative shrink-0 size-[28px]" data-node-id="98:2321" data-name="Iconly/Light/More Circle">
                <div className="absolute inset-[11.46%]" data-node-id="I98:2321;29221:1614" data-name="More Circle">
                  <div className="absolute inset-[-3.47%]">
                    <img alt="" className="block max-w-none size-full" src={imgMoreCircle} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] opacity-0 relative shrink-0 text-[#ff9431] text-[12px] text-center whitespace-nowrap" data-node-id="98:2322" style={{ fontVariationSettings: '"wdth" 100' }}>
                Home
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}