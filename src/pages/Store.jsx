import browseTemplates from "../assets/Templates.svg";
import defaultTemplates from "../assets/default-template.svg";

export function Store() {
  return (
    <div
      style={{
        padding: "44px 33px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* Default store template */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--grey-500)",
            borderRadius: 10,
            flex: 1,
            marginRight: 33,
            minWidth: 280,
            marginBottom: 37,
          }}
          className="shadowy"
        >
          <div style={{ padding: "27px 31px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 20,

                  fontFamily: "Satoshi-Bold",
                  marginBottom: 11,
                }}
              >
                Default store template
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "Satoshi-Regular",
                  color: "var(--grey-900)",
                }}
              >
                This is the default storefront template your store will have you
                can always <br /> change it when you{" "}
                <span
                  style={{
                    color: "var(--primary-navy-blue)",
                    fontFamily: "Satoshi-Bold",
                  }}
                >
                  upgrade your plan.
                </span>
              </div>
            </div>
            <img
              src={defaultTemplates}
              style={{
                marginTop: 21,
                display: "flex",
                maxWidth: "100%",
                height: "auto",
              }}
              alt="Default Template"
            />
          </div>
        </div>

        {/* Browse store front templates */}
        <div
          className="shadowy"
          style={{
            borderRadius: 10,
            backgroundImage: `url(${browseTemplates})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flex: 1,
            minWidth: 270,
            maxHeight: 463,
            minHeight: 393,
          }}
        >
          <div style={{ padding: "63px 57px" }}>
            <div
              style={{
                minWidth: 230,
                color: "#ffffff",
                fontSize: 33.16,

                fontFamily: "Satoshi-Black",
              }}
            >
              Browse store front templates.
            </div>
            <div
              style={{
                maxWidth: 420,
                minWidth: 230,
                color: "#ffffff",
                fontSize: 18.37,

                fontFamily: "Satoshi-Regular",
              }}
            >
              Explore different themes for your design and give your business a
              professional look!
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          border: "1px solid var(--grey-500)",
          borderRadius: 10,
          marginTop: 33,
          padding: "40px 33px",
        }}
        className="shadowy"
      >
        {/* Edit template contents */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              fontFamily: "Satoshi-Bold",
              marginBottom: 11,
            }}
          >
            Edit template contents
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: "Satoshi-Regular",
              color: "var(--grey-900)",
            }}
          >
            You can edit the contents of your storefront here and edit the way{" "}
            <br />
            your products are presented.
          </div>
        </div>
      </div>
    </div>
  );
}
