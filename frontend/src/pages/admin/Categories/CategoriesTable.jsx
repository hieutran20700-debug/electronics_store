import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../../../assets/styles/admin/categories.css"
import { SquarePen } from "lucide-react";
import { LockKeyhole } from "lucide-react";
const CategoriesTable = ({ categories = [], onEdit, onDelete }) => {
  return (
    <div>
      <Table responsive="sm" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Parent Category</th>
            <th>Active</th>

            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center">
                No categories found
              </td>
            </tr>
          ) : (
            categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.description || "-"}</td>
                <td>{cat.parentName || "-"}</td>
                <td>{cat.isActive ? "Active" : "Inactive"}</td>

                <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                <td>{new Date(cat.updatedAt).toLocaleDateString()}</td>
                <td className="d-flex justify-content-start align-items-center gap-2">
                  <SquarePen style={{ cursor: "pointer" }} color="#009981" />
                  <LockKeyhole style={{ cursor: "pointer" }} color="red" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
