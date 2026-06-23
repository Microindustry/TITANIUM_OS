// Permette `import md from "./file.md?raw"` (Vite raw import) con tipo string.
declare module "*.md?raw" {
  const content: string;
  export default content;
}
