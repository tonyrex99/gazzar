import LeftBackgroundImage from "./assets/slideshow/slideBg.png";
import Slide4 from "./assets/slideshow/slide4.png";
import { Grid } from "antd";
export default function RegisterLeft() {
  const screens = Grid.useBreakpoint();
  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${LeftBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        //height: "100%",
        width: "100%",
        flexDirection: "column",

        // maxWidth: 700,
      }}
    >
      <div
        style={{
          fontFamily: "Satoshi-Bold",
          fontSize: 36,
          alignSelf: "flex-start",
          marginTop: 76,
          marginLeft: 48,
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 32,
            borderRadius: 5,
            height: 32,
            marginRight: 15,
            background: "var(--secondary-gold)",
          }}
        />{" "}
        Gazzar
      </div>
      {screens.sm && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: 100,
            marginLeft: 20,
            marginTop: 50,

            flexDirection: "column",
          }}
        >
          <div>
            <img
              src={Slide4}
              width={469}
              height={255}
              style={{
                alignSelf: "center",
                justifySelf: "center",
                width: "100%",
                maxWidth: 469,
                minHeight: 103,
                minWidth: 255,
                // height: "100%",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: 40,
              color: "white",
              marginBottom: 30,
              marginLeft: 60,
            }}
          >
            Ready to take your <br />
            business to the <br /> next level?
          </div>
        </div>
      )}
    </div>
  );
}
