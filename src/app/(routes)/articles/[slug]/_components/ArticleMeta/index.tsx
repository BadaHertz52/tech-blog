import Icon from "@/components/Icon";

interface ArticleMetaProps {
  variant: "date";
  value: string;
}

export default function ArticleMeta({ variant, value }: ArticleMetaProps) {
  return (
    <div className="flex h-[22px] align-middle">
      <Icon
        name={variant === "date" ? "calendar" : "clock"}
        color={"#64748B"}
        className="mr-1 inline-block h-full w-[18px]"
      />
      <span className="h-full text-sm leading-[22px] text-[#64748B]">
        {value}
      </span>
    </div>
  );
}
