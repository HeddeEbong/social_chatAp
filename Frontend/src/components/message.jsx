import { Fragment, useState } from "react";
import DropDown from "./DropDown/DropDown";
import { ChevronDownIcon } from "./Icons";
import UseAuthContext from "../hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns/esm";

const Message = ({ m, ID }) => {
  const [showDropDown, setShowDropDown] = useState();
  const { user } = UseAuthContext();
  const [date, setDate] = useState(0);
  let time = new Date(m.at);
  function isLink(text) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(:[0-9]+)?([\/\w.-]*)*\/?(\?[^\s]*)?(#\S*)?$/;
    return urlPattern.test(text);
  }
  function isAbsoluteUrl(link) {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      return true;
    }

    try {
      const url = new URL(link);
      return url.protocol !== "" && url.host !== "";
    } catch {
      return false;
    }
  }
  function replaceLinks(str) {
    const regex =
      /(?:https?:\/\/|www\.)[^\s/$.?#]+\.[^\s/$.?#]+(?:\:\d+)?[^\s]*\b|[^\s/$.?#]+\.[^\s/$.?#]+(?:\:\d+)?[^\s]*\b/gi;
    return str.replace(regex, (match) => {
      let url = match;
      if (!url.match(/^(?:https?:\/\/|ftp:\/\/|mailto:|tel:)/i)) {
        url = "http://" + url;
      }
      return `<a target="_blank" class="text-blue-400" href="${url}">${match}</a>`;
    });
  }

  return (
    <div
      key={ID}
      className={`relative rounded-lg p-2 max-w-3xl [overflow-wrap:break-word] shadow-md
        ${
          m.from.toLowerCase() != user.username.toLowerCase()
            ? "self-start bg-white "
            : "self-end bg-teal-300 text-black"
        }
      `}
    >
      <div className="flex flex-wrap max-w-3xl text-justify cursor-text [overflow-wrap:anywhere] ">
        {isLink(m.content) ? (
          <a
            className="text-blue-400"
            target="_blank"
            href={`${
              isAbsoluteUrl(m.content) ? `${m.content}` : "http://" + m.content
            } `}
          >
            {m.content}
          </a>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: replaceLinks(m.content) }}></p>
        )}
      </div>
      <div
        onPointerLeave={(e) => {
          e.stopPropagation();
          setShowDropDown(false);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setShowDropDown(true);
        }}
        className=" text-xs flex"
      >
        <p className=" mt-auto">
          <span>{time.getHours()}:</span>
          <span>{time.getMinutes()}</span>
        </p>
        {showDropDown && (
          <DropDown
            className={"-top-[-8px] left-[-5em]"}
            DropDownToggler={
              <ChevronDownIcon
                className={`absolute h-8 w-8 cursor-pointer top-0 right-0 
                 drop-shadow-lg shadow-xl `}
              />
            }
          >
            <button>Delete message </button>
            <li>reply</li>
            <li>mark as read</li>
          </DropDown>
        )}
      </div>
    </div>
  );
};

export default Message;
