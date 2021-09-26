import { ObjectId } from "bson";

class CoverLetter {
  /**
   *
   * @param {string} name The name of the CoverLetter
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    salutation,
    intro,
    body,
    closing,
    signature,
    partition,
    status = CoverLetter.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.salutation = salutation;
    this.intro = intro;
    this.body = body;
    this.closing = closing;
    this.signature = signature;
    this.status = status;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";
  static schema = {
    name: "CoverLetter",
    properties: {
      _id: "objectId",
      name: "string",
      salutation: "string",
      intro: "string",
      body: "string",
      closing: "string",
      signature: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}

export { CoverLetter };