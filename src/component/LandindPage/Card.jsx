import notes5 from "../../assets/stnotes.png";
import pushpin from "../../assets/pushPin.png";

const Card = () => {
  return (
    <div className="relative z-50">
      {/* note1 */}
      <div className="absolute top-6 -left-6">
        <div className="pin pin1"></div>
        <div className="card-temp absolute"></div>
        <div className="card card1 bg-green-200  text-black flex pt-12">
          <div className="flex flex-col ml-6 text-xs">
            <p>call with Boss</p>
            <p>06:30 PM</p>
          </div>
        </div>
      </div>
      {/* note2 */}
      <div className="absolute xl:top-16 md:block sm:hidden xl:right-36 lg:right-44 lg:top-16 rotate-6">
        <div className="pindif spin"></div>
        <div className="card-temp absolute"></div>
        <div className="card card2 bg-green-200 text-black flex pt-12">
          <div className="relative text-sm font-medium rotate-45 -top-2 left-6">
            <p className="">lunch time</p>
          </div>
        </div>
      </div>

      {/* note3 */}
      <div className="absolute xl:top-[560px] lg:top-[580px] md:top-[540px] right-48 md:right-16 -rotate-12">
        <div className="pindif spin3"></div>
        <div className="card-temp3 absolute"></div>
        <div className="card card3 bg-green-200 text-black flex pt-12">
          <div className="flex flex-col ml-6 text-xs">
            <p>work on project</p>
          </div>
        </div>
      </div>

      {/* note4 */}
      <div className="absolute top-12 left-[600px]">
        <div className="relative">
          <img
            src={pushpin}
            alt="push-pin"
            width="30px"
            height="30px"
            className="absolute -top-2 z-50 left-20"
          />
        </div>

        <div className="card card4 text-black flex pt-12">
          <div className="flex flex-col ml-6 text-sm">
            <p>my gaming time</p>
            <p>09:30 PM</p>
          </div>
        </div>
      </div>
      {/* note5 */}
      <div className="absolute top-24 left-72 rotate-12">
        <div className="pin pin5"></div>
        <div className="note5 relative">
          <img alt="notes5" src={notes5} width="200px" />
          <p className="absolute top-16 w-32 text-sm ml-10">
            spend time with family.
          </p>
        </div>
      </div>
      {/* all notes */}
      <div className="absolute xl:top-[660px] lg:top-[590px] md:top-[540px] left-[440px] rotate-6">
        <div className="pin pin6"></div>
        <div className="ndiv1 -rotate-6"></div>
        <div className="ndiv2 hue-rotate-30 -rotate-12"></div>
        <div className=" ndiv3 -rotate-12 text-center pt-20">
          <p>Job time</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
