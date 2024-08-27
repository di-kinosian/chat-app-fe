import React from "react";
import { Field } from "./components/Field/index.tsx";
import { Input } from "./components/Input/index.tsx";
import { ElementSize } from "./types.ts";
import { Button } from "./components/Button/index.tsx";
import { UserManagerModal } from "./components/UserManagerModal/index.tsx";
import { Avatar } from "./components/Avatar/index.tsx";
import { Message } from "./components/Message/index.tsx";
import { Messages } from "./components/Messages/index.tsx";
import "./App.css";
import { Chat } from "./components/Chat/index.tsx";

function App() {
  return (
    // <div
    //   style={{
    //     padding: "30px",
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: 32,
    //   }}
    // >
    //   <Field label="Name">
    //     <Input placeholder="write your name" size={ElementSize.Large} />
    //   </Field>
    //   <Button size={ElementSize.Small} variant="primary">
    //     Save
    //   </Button>
    //   <Button size={ElementSize.Small} variant="secondary">
    //     Cancel
    //   </Button>

    //   <UserManagerModal isOpen={false} />

    //   <Avatar
    //     img="https://lh3.googleusercontent.com/ogw/AF2bZyhNkaae00A_7Tzr-qFYvICs2izmswjgOaagTp1DCehHxC0=s32-c-mo"
    //     alt=""
    //   />

    //   <div>
    //     <Message text="Hello there!" date="2024-08-27 10:00 AM" isOwn={false} />
    //     <Message
    //       text="Hi! How are you?"
    //       date="2024-08-27 10:01 AM"
    //       isOwn={true}
    //     />
    //     <Message
    //       text="I'm preate good! And you?"
    //       date="2024-08-27 10:02 AM"
    //       isOwn={false}
    //     />
    //   </div>

    //   <Messages
    //     messages={[
    //       { text: "Hello", date: "2024-08-27 12:01 AM", isOwn: false },
    //       {
    //         text: "Hi there! What's up?",
    //         date: "2024-08-27 12:02 AM",
    //         isOwn: true,
    //       },
    //       { text: "Hello", date: "2024-08-27 12:01 AM", isOwn: false },
    //       { text: "Hello", date: "2024-08-27 12:01 AM", isOwn: false },
    //     ]}
    //   />

    <Chat
      info={{
        firstName: "Nadia",
        lastName: "Krivorko",
        id: "1872687",
        avatar:
          "https://lh3.googleusercontent.com/ogw/AF2bZyhNkaae00A_7Tzr-qFYvICs2izmswjgOaagTp1DCehHxC0=s32-c-mo",
      }}
    />
    // </div>
  );
}

export default App;
