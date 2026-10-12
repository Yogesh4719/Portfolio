const assetPathPrefix = "/bitebuzz/53-2723";
const imgIcon = `${assetPathPrefix}/3fb12.svg`;
const imgHeart = `${assetPathPrefix}/ec9d4.svg`;
const imgImage31 = `${assetPathPrefix}/9661a.png`;
const img22BurgerFreeDownloadPng2 = `${assetPathPrefix}/da461.png`;
const imgStar3 = `${assetPathPrefix}/c3c70.svg`;
const imgIcon1 = `${assetPathPrefix}/64289.svg`;
const imgGroup38 = `${assetPathPrefix}/af25b.svg`;
const imgGroup37 = `${assetPathPrefix}/8b384.svg`;
const imgArrowDown2 = `${assetPathPrefix}/b584e.svg`;
const imgIcon2 = `${assetPathPrefix}/e52db.svg`;

function Frame57({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ff9431] content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[15px] w-[327px]"} data-node-id="46:1933">
      <div className="relative shrink-0 size-[24px]" data-node-id="46:1931" data-name="Icon">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
      </div>
      <p className="[word-break:break-word] capitalize font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[22px] text-white tracking-[-0.66px] whitespace-nowrap" data-node-id="46:1911" style={{ fontVariationSettings: '"opsz" 14' }}>
        Added to cart
      </p>
    </div>
  );
}

type Frame58Props = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Frame58({ className, property1 = "Default" }: Frame58Props) {
  const isVariant2 = property1 === "Variant2";
  return (
    <button className={className || "content-stretch flex items-start relative"} id={isVariant2 ? "node-49_2327" : "node-49_2325"}>
      {property1 === "Default" && <Frame57 className="bg-[#ff9431] content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[15px] shrink-0 w-[327px]" />}
      {isVariant2 && (
        <div className="bg-[#ff9431] content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[15px] shrink-0 w-[327px]" data-node-id="49:2328">
          <p className="[word-break:break-word] capitalize font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[22px] text-left text-white tracking-[-0.66px] whitespace-nowrap" data-node-id="I49:2328;46:1911" style={{ fontVariationSettings: '"opsz" 14' }}>
            Add to cart
          </p>
        </div>
      )}
    </button>
  );
}

type Frame62Props = {
  className?: string;
  property1?: "Default";
};

function Frame62({ className, property1 = "Default" }: Frame62Props) {
  return (
    <button className={className || "border border-[#0d0d0d] border-solid content-stretch flex items-center justify-center p-[8px] relative rounded-[10px]"} data-node-id="49:2302">
      <div className="relative shrink-0 size-[24px]" data-node-id="8:686" data-name="Iconly/Light/Heart">
        <div className="absolute inset-[12.5%_10.43%_12.51%_10.42%]" data-node-id="I8:686;29221:1525" data-name="Heart">
          <div className="absolute inset-[-4.17%_-3.93%]">
            <img alt="" className="block max-w-none size-full" src={imgHeart} />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function PaneerPizza() {
  return (
    <div className="bg-[#fff1e5] overflow-clip relative rounded-[20px] size-full" data-node-id="53:2723" data-name="paneer pizza">
      <div className="absolute h-[332px] left-[-1px] top-0 w-[375px]" data-node-id="58:1884" data-name="image 31">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage31} />
      </div>
      <Frame62 className="absolute border border-[#0d0d0d] border-solid content-stretch cursor-pointer flex items-center justify-center p-[8px] right-[24px] rounded-[10px] top-[32px]" />
      <div className="absolute bg-white content-stretch flex flex-col h-[506px] items-center justify-between left-0 pb-[32px] pt-[24px] px-[24px] right-0 rounded-tl-[25px] rounded-tr-[25px] top-[306px]" data-node-id="53:2725">
        <div className="content-stretch flex flex-col gap-[32px] items-center justify-center relative shrink-0 w-full" data-node-id="53:2726">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="53:2727">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="53:2728">
              <p className="[word-break:break-word] capitalize font-['DM_Sans:Bold'] font-bold leading-[normal] relative shrink-0 text-[#0d0d0d] text-[24px] tracking-[-0.72px] whitespace-nowrap" data-node-id="53:2729" style={{ fontVariationSettings: '"opsz" 14' }}>
                Paneer Pizza
              </p>
              <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-node-id="53:2730">
                <div className="relative shrink-0 size-[24px]" data-node-id="53:2731">
                  <div className="absolute inset-[9.32%_11.1%_16.27%_11.1%]">
                    <img alt="" className="block max-w-none size-full" src={imgStar3} />
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['DM_Sans:Regular'] font-normal gap-[4px] items-center justify-center leading-[normal] relative shrink-0 text-[#0d0d0d] whitespace-nowrap" data-node-id="53:2732">
                  <p className="relative shrink-0 text-[18px] tracking-[-0.54px]" data-node-id="53:2733" style={{ fontVariationSettings: '"opsz" 14' }}>
                    4.8
                  </p>
                  <p className="relative shrink-0 text-[12px] tracking-[-0.36px]" data-node-id="53:2734" style={{ fontVariationSettings: '"opsz" 14' }}>
                    (41 Reviews)
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-node-id="53:2735">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#ff9431] text-[32px] whitespace-nowrap" data-node-id="53:2736">
                ₹160
              </p>
              <div className="h-[20px] relative shrink-0 w-[86px]" data-node-id="55:2024" data-name="Location">
                <div className="absolute inset-[0_76.74%_0_0]" data-node-id="55:2025" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
                </div>
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[16px] left-[55px] not-italic text-[#101010] text-[20px] text-center top-[2px] whitespace-nowrap" data-node-id="55:2026">
                  1.6Km
                </p>
              </div>
              <div className="bg-[#fff1e5] content-stretch flex items-center justify-between p-[4px] relative rounded-[26px] shrink-0 w-[118px]" data-node-id="53:2737">
                <div className="relative shrink-0 size-[32px]" data-node-id="53:2738">
                  <div className="absolute inset-[-31.25%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup38} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-['DM_Sans:Regular'] font-normal leading-[normal] relative shrink-0 text-[#0d0d0d] text-[24px] tracking-[-0.72px] whitespace-nowrap" data-node-id="53:2741" style={{ fontVariationSettings: '"opsz" 14' }}>
                  1
                </p>
                <div className="relative shrink-0 size-[32px]" data-node-id="53:2742">
                  <div className="absolute inset-[-31.25%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup37} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[23px] items-center relative shrink-0 w-full" data-node-id="53:2747">
            <div className="bg-white border border-[#ff9431] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px p-[8px] relative rounded-[10px]" data-node-id="53:2748">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="53:2749">
                <p className="[word-break:break-word] font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#ff9431] text-[14px] tracking-[-0.42px] whitespace-nowrap" data-node-id="53:2750" style={{ fontVariationSettings: '"opsz" 14' }}>
                  Size
                </p>
                <div className="relative shrink-0 size-[16px]" data-node-id="53:2751" data-name="Iconly/Light/Arrow - Down 2">
                  <div className="absolute inset-[35.42%_20.83%]" data-node-id="I53:2751;16162:2465;0:4167" data-name="Arrow - Down 2">
                    <div className="absolute inset-[-16.07%_-8.03%_-16.07%_-8.04%]">
                      <img alt="" className="block max-w-none size-full" src={imgArrowDown2} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#0d0d0d] text-[18px] tracking-[-0.54px] whitespace-nowrap" data-node-id="53:2752" style={{ fontVariationSettings: '"opsz" 14' }}>
                Medium
              </p>
            </div>
            <div className="bg-white border border-[#ff9431] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px p-[8px] relative rounded-[10px]" data-node-id="53:2753">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[77px]" data-node-id="53:2754">
                <p className="[word-break:break-word] font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#ff9431] text-[14px] tracking-[-0.42px] whitespace-nowrap" data-node-id="53:2755" style={{ fontVariationSettings: '"opsz" 14' }}>
                  Energy
                </p>
                <div className="opacity-0 relative shrink-0 size-[16px]" data-node-id="53:2756" data-name="Iconly/Light/Arrow - Down 2">
                  <div className="absolute inset-[35.42%_20.83%]" data-node-id="I53:2756;16162:2465;0:4167" data-name="Arrow - Down 2">
                    <div className="absolute inset-[-16.07%_-8.03%_-16.07%_-8.04%]">
                      <img alt="" className="block max-w-none size-full" src={imgArrowDown2} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#0d0d0d] text-[18px] tracking-[-0.54px] whitespace-nowrap" data-node-id="53:2757" style={{ fontVariationSettings: '"opsz" 14' }}>
                550 KCal
              </p>
            </div>
            <div className="bg-white border border-[#ff9431] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px p-[8px] relative rounded-[10px]" data-node-id="53:2758">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[77px]" data-node-id="53:2759">
                <p className="[word-break:break-word] font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#ff9431] text-[14px] tracking-[-0.42px] whitespace-nowrap" data-node-id="53:2760" style={{ fontVariationSettings: '"opsz" 14' }}>
                  Delivery
                </p>
                <div className="opacity-0 relative shrink-0 size-[16px]" data-node-id="53:2761" data-name="Iconly/Light/Arrow - Down 2">
                  <div className="absolute inset-[35.42%_20.83%]" data-node-id="I53:2761;16162:2465;0:4167" data-name="Arrow - Down 2">
                    <div className="absolute inset-[-16.07%_-8.03%_-16.07%_-8.04%]">
                      <img alt="" className="block max-w-none size-full" src={imgArrowDown2} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[#0d0d0d] text-[18px] tracking-[-0.54px] whitespace-nowrap" data-node-id="53:2762" style={{ fontVariationSettings: '"opsz" 14' }}>
                45 min
              </p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[#0d0d0d] w-full" data-node-id="53:2763">
            <p className="font-['DM_Sans:Medium'] font-medium leading-[normal] relative shrink-0 text-[18px] tracking-[-0.54px] whitespace-nowrap" data-node-id="53:2764" style={{ fontVariationSettings: '"opsz" 14' }}>
              About
            </p>
            <p className="font-['DM_Sans:Regular'] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] tracking-[-0.42px] w-[min-content]" data-node-id="53:2765" style={{ fontVariationSettings: '"opsz" 14' }}>
              Indulge in our delicious Paneer Pizza, a perfect fusion of Indian and Italian flavors. This pizza features a crispy, homemade crust topped with marinated paneer cubes, vibrant bell peppers, and red onions
            </p>
          </div>
        </div>
        <Frame58 className="content-stretch cursor-pointer flex items-start relative shrink-0" property1="Variant2" />
      </div>
      <a className="absolute bg-[rgba(255,255,255,0)] border border-black border-solid content-stretch cursor-pointer flex items-start left-[29px] p-[8px] rounded-[100px] top-[34px]" data-node-id="53:2767" data-name="Back">
        <div className="relative shrink-0 size-[20px]" data-node-id="53:2768" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
        </div>
      </a>
      <div className="absolute h-[166px] left-[72px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[97px] w-[229px]" data-node-id="53:2788" data-name="2-2-burger-free-download-png 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img22BurgerFreeDownloadPng2} />
      </div>
    </div>
  );
}