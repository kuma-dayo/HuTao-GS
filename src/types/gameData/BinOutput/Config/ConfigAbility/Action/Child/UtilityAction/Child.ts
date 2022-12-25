import ConfigAbilityPredicate from "$DT/BinOutput/Config/ConfigAbility/Predicate"
import ConfigBaseAbilityAction from ".."
import ConfigAbilityAction from "../.."

export default type BaseUtilityAction = ConfigBaseAbilityAction

export interface Predicated extends BaseUtilityAction {
  $type: "Predicated"
  TargetPredicates: ConfigAbilityPredicate[]
  SuccessActions: ConfigAbilityAction[]
  FailActions: ConfigAbilityAction[]
}
