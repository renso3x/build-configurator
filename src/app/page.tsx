import { getAllSectionsWithSpecs } from "@/actions/form-builder";
import FormBuilder from "@/components/form-builder";

export default async function Page() {
  const data = await getAllSectionsWithSpecs();

  console.log("Page data:", data);

  return <FormBuilder />;
}
