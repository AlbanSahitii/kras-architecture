import {defineConfig} from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "Projects",
        label: "Projects",
        path: "content/projects",
        fields: [
          {
            type: "string",
            name: "Title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "Type",
            label: "Type",
            required: true,
          },
          {
            type: "string",
            name: "City",
            label: "City",
            required: true,
          },
          {
            type: "string",
            name: "Addres",
            label: "Address",
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "date",
            required: true,
          },
          {
            type: "string",
            name: "Description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "Surface",
            label: "Surface",
            required: true,
          },
          {
            type: "string",
            name: "Floors",
            label: "Floors",
            required: true,
          },
          {
            type: "string",
            name: "Investor",
            label: "Investor",
            required: true,
          },
          {
            type: "string",
            name: "Thumbnail",
            label: "Thumbnail image",
            required: true,
            ui: {
              component: "image",
            },
          },

          {
            type: "object",
            name: "Images",
            label: "Images",
            list: true,
            fields: [
              {
                type: "string",
                name: "path",
                ui: {
                  component: "image",
                },
              },
            ],
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({document}) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
