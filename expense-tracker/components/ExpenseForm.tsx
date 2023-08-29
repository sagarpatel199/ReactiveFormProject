import React from "react";
import { Schema, TypeOf, z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./categories";

interface ExpenseFormData {
  description: string;
  amount: number;
  category: (typeof categories)[number];
}

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const schema = z.object({
    description: z
      .string()
      .min(3, { message: "Description should be atleast 3 characters long." })
      .max(50),
    amount: z
      .number({ invalid_type_error: "A number is required." })
      .min(0.01)
      .max(100_000),
    category: z.enum(categories, {
      errorMap: () => ({ message: "Category is required" }),
    }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  type ExpenseFormData = z.infer<typeof schema>;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          name=""
          id="category"
          className="form-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category?.message && (
          <p className="text-danger">{errors.category.message}</p>
        )}
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
