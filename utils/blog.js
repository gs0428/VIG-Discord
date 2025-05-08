export const getBlogStatus = async (url) => {
  const isVelog = /^https?:\/\/(www\.)?velog\.io\/@[\w.]+(\/.*)?$/i.test(url);
  const isTistory = /^https?:\/\/[\w-]+\.tistory\.com(\/.*)?$/i.test(url);

  if (!isVelog && !isTistory) {
    return 400;
  }

  const status = await fetch(url, { method: "GET" }).then((res) => res.status);

  return status;
};
