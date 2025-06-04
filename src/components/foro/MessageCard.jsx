//src/components/foro/MessageCard.jsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MessageCard = ({ msg, isCurrentUser }) => {
  return (
    <Card
      className={`mb-4 ${
        isCurrentUser ? "bg-blue-50 ml-auto" : "bg-gray-50 mr-auto"
      } max-w-[80%]`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback>
                {msg.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm">{msg.username}</CardTitle>
          </div>
          <span className="text-xs text-gray-500">{msg.timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm">{msg.content}</p>
      </CardContent>
    </Card>
  );
};

export default MessageCard;