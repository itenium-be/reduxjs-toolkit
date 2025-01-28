import { useState } from "react";
import { useAddVisitorMutation } from "../zoo-api";
import { Visitor } from "../MythicalZoo";

const defaultVisitor: Partial<Visitor> = { name: "", type: "🧙", ticketType: "🎫 Standard" };

export const VisitZoo = ({zooId}: {zooId: number}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(defaultVisitor);

  // Mutator hook created by RTK Query:
  const [addVisitor] = useAddVisitorMutation();
  // NEXT: Back to the zoo-api.ts!

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn btn-success" style={{marginLeft: 12}}>
        <i className="fas fa-map-marker-alt me-2" />
        Visit Us
      </button>
    );
  }


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    setFormData(defaultVisitor);

    // Calling our "backend"
    const postVisitor = {...formData, zooId};
    await addVisitor(postVisitor);
  };

  return (
    <div
      className="modal d-block"
      id="visitorModal"
      tabIndex={-1}
      aria-labelledby="visitorModalLabel"
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="visitorModalLabel">
              Tell us about yourself
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setOpen(false)}
            />
          </div>
          <form>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="🧙">🧙 Wizard</option>
                  <option value="🦸">🦸 Superhero</option>
                  <option value="👸">👸 Princess</option>
                  <option value="🧝">🧝 Elf</option>
                </select>
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                >
                  <option value="🎫 Standard">🎫 Standard</option>
                  <option value="👑 VIP">👑 VIP</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!formData.name.length}>
                Register Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
